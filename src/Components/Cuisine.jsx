import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cuisine = ({ countryName }) => {
const [meal, setMeal] = useState(null);
const [loading, setLoading] = useState(true);
const [hasMoreMeals, setHasMoreMeals] = useState(false);

useEffect(() => {
fetchMeal();
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

const fetchMeal = async () => {
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

if (mealsData.length > 0) {
setMeal(mealsData[0]);
setHasMoreMeals(mealsData.length > 1);
}

setLoading(false);
} catch (error) {
console.error(error);
setLoading(false);
}
};

if (loading) return <div className="loading">Loading cuisine...</div>;

return (
<div className="cuisine-section" id="main-cuisine">
<h2 className="cuisine-title">🍽️ Traditional Cuisine from {countryName}</h2>

{meal ? (
<div className="meal-card" id={`meal-${meal.idMeal}`}>
<img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
<div className="meal-content">
<h3 className="meal-name">{meal.strMeal}</h3>
<p className="meal-category">{meal.strCategory}</p>

{hasMoreMeals && (
<Link
to={`/cuisines/${countryName}`}
className="view-all-btn"
id="view-all-cuisines-btn"
>
🍽️ View All Cuisines
</Link>
)}
</div>
</div>
) : (
<div className="empty-state" id="no-cuisine">
<p className="empty-message">No Cuisine</p>
</div>
)}
</div>
);
};

export default Cuisine;