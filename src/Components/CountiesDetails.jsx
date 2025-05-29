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

      const searchTerms = [
        countryInfo.name.common,
        countryInfo.region,
        countryInfo.name.common === 'United Kingdom' ? 'British' : '',
        countryInfo.name.common === 'United States' ? 'American' : '',
        countryInfo.name.common === 'France' ? 'French' : '',
        countryInfo.name.common === 'Italy' ? 'Italian' : '',
        countryInfo.name.common === 'Greece' ? 'Greek' : '',
        countryInfo.name.common === 'Spain' ? 'Spanish' : '',
        countryInfo.name.common === 'India' ? 'Indian' : '',
        countryInfo.name.common === 'China' ? 'Chinese' : '',
        countryInfo.name.common === 'Japan' ? 'Japanese' : '',
        countryInfo.name.common === 'Thailand' ? 'Thai' : '',
        countryInfo.name.common === 'Mexico' ? 'Mexican' : '',
      ].filter(Boolean);

      let mealsData = [];
      for (const term of searchTerms) {
        try {
          const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
          const mealData = await mealResponse.json();
          if (mealData.meals) {
            mealsData = mealData.meals.slice(0, 6); 
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading country details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Country not found</div>
          <Link to="/countries" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={country.flags?.png}
                alt={`${country.name.common} flag`}
                className="w-16 h-12 object-cover rounded shadow-lg"
              />
              <h1 className="text-4xl font-bold">{country.name.common}</h1>
            </div>
            <p className="text-xl opacity-90">{country.name.official}</p>
            <p className="text-lg opacity-80">{country.region} • {country.subregion}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Country Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Country Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Capital</h3>
                  <p>{country.capital?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Population</h3>
                  <p>{country.population?.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Area</h3>
                  <p>{country.area?.toLocaleString()} km²</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Time Zone</h3>
                  <p>{country.timezones?.[0]}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Currency</h3>
                  <p>
                    {country.currencies ? 
                      Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') 
                      : 'N/A'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Calling Code</h3>
                  <p>{country.idd?.root}{country.idd?.suffixes?.[0]}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Languages & Culture</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Languages</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {country.languages ? 
                      Object.values(country.languages).map((lang, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      )) : 'N/A'
                    }
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Region</h4>
                  <p>{country.region}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Subregion</h4>
                  <p>{country.subregion}</p>
                </div>

                {/* Book Trip Button */}
                <div className="pt-4">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    📅 Book Trip to {country.name.common}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Food Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">🍽️ Traditional Cuisine</h2>
          {meals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <div key={meal.idMeal} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{meal.strMeal}</h3>
                    <p className="text-gray-600 text-sm mb-2">Category: {meal.strCategory}</p>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {meal.strInstructions?.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>🍴 Traditional cuisine information not available for this country.</p>
              <p className="text-sm mt-2">Explore other cultural aspects of {country.name.common}!</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/countries"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            ← Back to Countries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;