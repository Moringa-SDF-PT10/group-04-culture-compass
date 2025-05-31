import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountryDetails();
  }, [id]);

  const fetchCountryDetails = async () => {
    try {
      setLoading(true);
      
      const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      if (!countryResponse.ok) throw new Error('Country not found');
      
      const countryData = await countryResponse.json();
      const countryInfo = countryData[0];
      setCountry(countryInfo);

      const getCuisineMapping = (countryName) => {
        const mappings = {
          'United Kingdom': ['British', 'English'],
          'United States': ['American'],
          'France': ['French'],
          'Italy': ['Italian'],
          'Greece': ['Greek'],
          'Spain': ['Spanish'],
          'India': ['Indian'],
          'China': ['Chinese'],
          'Japan': ['Japanese'],
          'Thailand': ['Thai'],
          'Mexico': ['Mexican'],
          'Turkey': ['Turkish'],
          'Morocco': ['Moroccan'],
          'Egypt': ['Egyptian'],
          'Jamaica': ['Jamaican'],
          'Canada': ['Canadian'],
          'Russia': ['Russian'],
          'Poland': ['Polish'],
          'Portugal': ['Portuguese'],
          'Croatia': ['Croatian'],
          'Tunisia': ['Tunisian'],
          'Ireland': ['Irish'],
          'Malaysia': ['Malaysian'],
          'Philippines': ['Filipino'],
          'Vietnam': ['Vietnamese'],
          'Lebanon': ['Lebanese'],
          'Ukraine': ['Ukrainian'],
          'Bosnia and Herzegovina': ['Bosnian'],
          'Slovenia': ['Slovenian'],
          'Slovakia': ['Slovakian'],
          'Netherlands': ['Dutch'],
          'Germany': ['German'],
          'Austria': ['Austrian'],
          'Switzerland': ['Swiss'],
        };
        return mappings[countryName] || [countryName];
      };

      const searchTerms = [
        ...getCuisineMapping(countryInfo.name.common),
        countryInfo.name.common,
        countryInfo.region
      ].filter(Boolean);

      let mealsData = [];
      for (const term of searchTerms) {
        try {
          let mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
          let mealData = await mealResponse.json();
          
          if (!mealData.meals && term !== countryInfo.region) {
            mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
            mealData = await mealResponse.json();
          }
          
          if (mealData.meals && mealData.meals.length > 0) {
            const detailedMeals = [];
            for (const meal of mealData.meals.slice(0, 6)) {
              try {
                const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                const detailData = await detailResponse.json();
                if (detailData.meals) {
                  detailedMeals.push(detailData.meals[0]);
                }
              } catch (error) {
                detailedMeals.push(meal);
              }
            }
            mealsData = detailedMeals;
            break; 
          }
        } catch (error) {
          console.log(`No meals found for ${term}`);
        }
      }
      
      setMeals(mealsData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="text">Loading country details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="message">
          <div className="title">Country not found</div>
          <Link to="/countries" className="button">
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page" id="countryDetails">
      {/* Hero Section */}
      <div className="hero">
        <div className="overlay"></div>
        <div className="content">
          <div className="header">
            <div className="flaginfo">
              <img
                src={country.flags?.png}
                alt={`${country.name.common} flag`}
                className="flag"
              />
              <h1 className="name">{country.name.common}</h1>
            </div>
            <p className="official">{country.name.official}</p>
            <p className="location">{country.region} • {country.subregion}</p>
          </div>
        </div>
      </div>

      <div className="container" id="details">
        {/* Country Information */}
        <div className="section">
          <div className="main">
            <div className="card">
              <h2 className="title">Country Overview</h2>
              <div className="grid">
                <div className="item">
                  <h3 className="label">Capital</h3>
                  <p className="value">{country.capital?.[0] || 'N/A'}</p>
                </div>
                <div className="item">
                  <h3 className="label">Population</h3>
                  <p className="value">{country.population?.toLocaleString()}</p>
                </div>
                <div className="item">
                  <h3 className="label">Area</h3>
                  <p className="value">{country.area?.toLocaleString()} km²</p>
                </div>
                <div className="item">
                  <h3 className="label">Time Zone</h3>
                  <p className="value">{country.timezones?.[0]}</p>
                </div>
                <div className="item">
                  <h3 className="label">Currency</h3>
                  <p className="value">
                    {country.currencies ? 
                      Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') 
                      : 'N/A'
                    }
                  </p>
                </div>
                <div className="item">
                  <h3 className="label">Calling Code</h3>
                  <p className="value">{country.idd?.root}{country.idd?.suffixes?.[0]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="card">
              <h3 className="title">Languages & Culture</h3>
              <div className="content">
                <div className="item">
                  <h4 className="label">Languages</h4>
                  <div className="languages">
                    {country.languages ? 
                      Object.values(country.languages).map((lang, index) => (
                        <span key={index} className="language">
                          {lang}
                        </span>
                      )) : 'N/A'
                    }
                  </div>
                </div>
                
                <div className="item">
                  <h4 className="label">Region</h4>
                  <p className="value">{country.region}</p>
                </div>
                
                <div className="item">
                  <h4 className="label">Subregion</h4>
                  <p className="value">{country.subregion}</p>
                </div>

                {/* Book Trip Button */}
                <div className="booking">
                  <button className="button" id="bookTrip">
                    📅 Book Trip to {country.name.common}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Food Section */}
        <div className="card" id="cuisine">
          <h2 className="title">🍽️ Traditional Cuisine</h2>
          {meals.length > 0 ? (
            <div className="grid" id="meals">
              {meals.map((meal) => (
                <div key={meal.idMeal} className="meal">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="image"
                  />
                  <div className="content">
                    <h3 className="name">{meal.strMeal}</h3>
                    <p className="category">Category: {meal.strCategory}</p>
                    <p className="description">
                      {meal.strInstructions?.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="message">🍴 Traditional cuisine information not available for this country.</p>
              <p className="submessage">Explore other cultural aspects of {country.name.common}!</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="navigation">
          <Link
            to="/countries"
            className="button"
            id="backButton"
          >
            ← Back to Countries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;