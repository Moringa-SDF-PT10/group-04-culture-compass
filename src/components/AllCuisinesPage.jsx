import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AllCuisinesPage = () => {
  const { countryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMeals();
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

  const fetchAllMeals = async () => {
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
            mealsData = data.meals;
            break;
          }
        } catch (error) {
          console.log(`No meals for ${term}`);
        }
      }

      setMeals(mealsData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading all cuisines...</div>;

  return (
    <div className="all-cuisines-section" id="all-cuisines-page">
      <div className="page-header">
        <h2 className="page-title">🍽️ All Cuisines from {countryName}</h2>
        <button onClick={handleBack} className="back-btn" id="back-to-main-btn">
          ← Back
        </button>
      </div>

      {meals.length > 0 ? (
        <div className="meals-grid" id="all-meals-grid">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-item" id={`meal-item-${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-thumbnail" />
              <div className="meal-info">
                <h3 className="meal-title">{meal.strMeal}</h3>
                <p className="meal-type">{meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state" id="no-cuisines">
          <p className="empty-message">No Cuisine</p>
        </div>
      )}
    </div>
  );
};

export default AllCuisinesPage;