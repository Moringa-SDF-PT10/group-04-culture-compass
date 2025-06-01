import { useState, useEffect } from 'react';

const Cuisine = ({ countryName }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchMeals();
  }, [countryName]);

  const getCuisineMapping = (name) => {
    const mappings = {
      'United Kingdom': ['British'], 'United States': ['American'], 'France': ['French'],
      'Italy': ['Italian'], 'Greece': ['Greek'], 'Spain': ['Spanish'], 'India': ['Indian'],
      'China': ['Chinese'], 'Japan': ['Japanese'], 'Thailand': ['Thai'], 'Mexico': ['Mexican'],
      'Turkey': ['Turkish'], 'Morocco': ['Moroccan'], 'Egypt': ['Egyptian'], 'Jamaica': ['Jamaican']
    };
    return mappings[name] || [name];
  };

  const fetchMeals = async () => {
    try {
      const terms = [...getCuisineMapping(countryName), countryName];
      let mealsData = [];

      for (const term of terms) {
        try {
          let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
          let data = await response.json();

          if (!data.meals) {
            response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
            data = await response.json();
          }

          if (data.meals) {
            mealsData = data.meals.slice(0, 6);
            break;
          }
        } catch (error) {
          console.log(`No meals for ${term}`);
        }
      }
      
      setMeals(mealsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review:', review, 'Rating:', rating);
    setReview('');
    setRating(5);
    alert('Review submitted!');
  };

  if (loading) return <div className="loading">Loading cuisine...</div>;

  return (
    <div className="section">
      <h2>🍽️ Traditional Cuisine</h2>
      
      {/* Meals Grid */}
      {meals.length > 0 ? (
        <div className="meals">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="content">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>🍴 No cuisine data available</p>
        </div>
      )}

      {/* Review Section */}
      <div className="reviews">
        <h3>Rate This Cuisine</h3>
        <form onSubmit={handleReviewSubmit} className="form">
          <div className="rating">
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="select">
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>
          
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={`Share your thoughts about ${countryName}'s cuisine...`}
            className="textarea"
            rows="4"
            required
          />
          
          <button type="submit" className="btn submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Cuisine;