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
  'United Kingdom': ['British'], 'United States': ['American'], 'France': ['French'], 'Italy': ['Italian'],
  'Greece': ['Greek'], 'Spain': ['Spanish'], 'India': ['Indian'], 'China': ['Chinese'], 'Japan': ['Japanese'],
  'Thailand': ['Thai'], 'Mexico': ['Mexican'], 'Turkey': ['Turkish'], 'Morocco': ['Moroccan'], 'Egypt': ['Egyptian'],
  'Jamaica': ['Jamaican'], 'Germany': ['German'], 'Poland': ['Polish'], 'Portugal': ['Portuguese'], 'Russia': ['Russian'],
  'Ukraine': ['Russian', 'Polish'], 'Ireland': ['Irish', 'British'], 'Canada': ['Canadian', 'American'],
  'Australia': ['British'], 'New Zealand': ['British'], 'South Africa': ['British'], 'Netherlands': ['Dutch', 'British'],
  'Belgium': ['French'], 'Switzerland': ['French', 'Italian'], 'Austria': ['German'], 'Sweden': ['British'],
  'Norway': ['British'], 'Denmark': ['British'], 'Finland': ['Russian'], 'Brazil': ['Portuguese', 'Spanish'],
  'Argentina': ['Spanish'], 'Chile': ['Spanish'], 'Peru': ['Spanish'], 'Colombia': ['Spanish'],
  'Venezuela': ['Spanish'], 'Ecuador': ['Spanish'], 'Bolivia': ['Spanish'], 'Uruguay': ['Spanish'],
  'Paraguay': ['Spanish'], 'Vietnam': ['Vietnamese', 'Thai'], 'South Korea': ['Korean', 'Chinese'],
  'North Korea': ['Korean', 'Chinese'], 'Malaysia': ['Malaysian', 'Thai'], 'Singapore': ['Malaysian', 'Chinese'],
  'Indonesia': ['Thai'], 'Philippines': ['American'], 'Pakistan': ['Indian'], 'Bangladesh': ['Indian'],
  'Sri Lanka': ['Indian'], 'Nepal': ['Indian'], 'Myanmar': ['Thai'], 'Cambodia': ['Thai'], 'Laos': ['Thai'],
  'Iran': ['Turkish'], 'Iraq': ['Turkish'], 'Syria': ['Turkish'], 'Lebanon': ['Turkish'], 'Jordan': ['Turkish'],
  'Israel': ['Turkish'], 'Palestine': ['Turkish'], 'Saudi Arabia': ['Turkish'], 'UAE': ['Turkish'], 'Kuwait': ['Turkish'],
  'Qatar': ['Turkish'], 'Bahrain': ['Turkish'], 'Oman': ['Turkish'], 'Yemen': ['Turkish'], 'Tunisia': ['Moroccan'],
  'Algeria': ['Moroccan'], 'Libya': ['Moroccan'], 'Sudan': ['Egyptian'], 'Ethiopia': ['Egyptian'], 'Kenya': ['British'],
  'Tanzania': ['British'], 'Uganda': ['British'], 'Rwanda': ['British'], 'Burundi': ['British'], 'Nigeria': ['British'],
  'Ghana': ['British'], 'Senegal': ['French'], 'Mali': ['French'], 'Burkina Faso': ['French'], 'Niger': ['French'],
  'Chad': ['French'], 'Cameroon': ['French'], 'Madagascar': ['French'], 'Cuba': ['Spanish'],
  'Dominican Republic': ['Spanish'], 'Haiti': ['French'], 'Puerto Rico': ['American'], 'Trinidad and Tobago': ['Jamaican'],
  'Barbados': ['Jamaican'], 'Bahamas': ['American'], 'Croatia': ['Italian'], 'Serbia': ['Turkish'],
  'Bosnia and Herzegovina': ['Turkish'], 'Montenegro': ['Turkish'], 'Albania': ['Turkish'],
  'North Macedonia': ['Turkish'], 'Bulgaria': ['Turkish'], 'Romania': ['Turkish'], 'Hungary': ['German'],
  'Czech Republic': ['German'], 'Slovakia': ['German'], 'Slovenia': ['Italian'], 'Latvia': ['Russian'],
  'Lithuania': ['Russian'], 'Estonia': ['Russian'], 'Belarus': ['Russian'], 'Moldova': ['Russian'],
  'Georgia': ['Turkish'], 'Armenia': ['Turkish'], 'Azerbaijan': ['Turkish'], 'Kazakhstan': ['Russian'],
  'Uzbekistan': ['Russian'], 'Turkmenistan': ['Turkish'], 'Kyrgyzstan': ['Russian'], 'Tajikistan': ['Russian'],
  'Afghanistan': ['Indian'], 'Mongolia': ['Chinese'], 'Taiwan': ['Chinese'], 'Hong Kong': ['Chinese'],
  'Macau': ['Chinese'], 'Iceland': ['British'], 'Greenland': ['British'], 'Malta': ['Italian'],
  'Cyprus': ['Greek'], 'Luxembourg': ['French'], 'Monaco': ['French'], 'Andorra': ['Spanish'],
  'San Marino': ['Italian'], 'Vatican City': ['Italian'], 'Liechtenstein': ['German']
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
<h2 className="cuisine-title"><img className="brand-logo" src ='/assets/favicon2.png'/>World Class Cuisine from {countryName}</h2>

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
<img src='/assets/creamRamen.png'/>View All Cuisines
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