import { useState, useEffect } from 'react';

const Cuisine = ({ countryName }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading">Loading cuisine...</div>;

  return (
    <div className="cuisine-section">
      <h2><img src='/src/assets/cuisine.png'/> Traditional Cuisine</h2>
      
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
    </div>
  );
};

export default Cuisine;