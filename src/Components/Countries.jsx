import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.region && country.region.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      
      const sortedCountries = data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .slice(0, 50);
      
      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading countries...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Countries & Cultures</h1>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search countries or regions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Link
            key={country.cca3}
            to={`/country/${country.cca3}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={country.flags?.png || country.flags?.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <div className="text-white p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-lg font-semibold">{country.name.common}</h3>
                  <p className="text-sm opacity-90">{country.region}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Capital: {country.capital?.[0] || 'N/A'}</span>
                <span>{(country.population / 1000000).toFixed(1)}M people</span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {country.languages && Object.values(country.languages).slice(0, 2).map((lang, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No countries found matching your search.
        </div>
      )}
    </div>
  );
};

export default Countries;