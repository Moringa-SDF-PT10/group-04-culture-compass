import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCulturalSiteImage = (countryCode) => {
  const seed = countryCode.charCodeAt(0) + countryCode.charCodeAt(1) + countryCode.charCodeAt(2);
  return `https://picsum.photos/seed/${seed}/2000/500`; //for consitency charcode uses a lot of math bruh ydek. it basically takes the 1, 2, 3 letters and creates a unique code for the countries so the images are constant lol
};


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
  .slice(0, 250);

const countriesWithImages = sortedCountries.map((country) => ({
  ...country,
  culturalImage: getCulturalSiteImage(country.cca3)
      }));

setCountries(countriesWithImages);
setFilteredCountries(countriesWithImages);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="text">Loading countries...</div>
      </div>
    );
  }

  return (
  <div className='body'>
    <div className="container" id="countries">
      <h1 className="title">Explore Countries & Cultures</h1>
      
      {/* Search Bar */}
      <div className="search">
        <input
          id="searchbox"
          type="text"
          placeholder="Search countries or regions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </div>

      {/* Countries Grid */}
      <div className="grid" id="countriesGrid">
        {filteredCountries.map((country) => (
          <Link
            key={country.cca3}
            to={`/country/${country.cca3}`}
            className="card"
          >
            <div className="image">
              <img
        src={country.culturalImage}
          alt={`${country.name.common} cultural site`}
        className="flag"
              />
              <div className="overlay">
                <div className="info">
                  <h3 className="name">{country.name.common}</h3>
                  <p className="region">{country.region}</p>
                </div>
              </div>
            </div>
            
            <div className="content">
              <div className="details">
                <span className="capital">The Capital: {country.capital?.[0] || 'N/A'}</span>
                <span className="population">{(country.population / 1000000).toFixed(1)}M people</span>
              </div>
              
              <div className="languages">
                {country.languages && Object.values(country.languages).slice(0, 2).map((lang, index) => (
                  <span key={index} className="language">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Click to explore cuisine hint */}
              <div className="cuisine">
                <div className="hint">
                  <span className="icon"><img src='/src/assets/creamRamen.png'/></span>
                  <span className="text">Explore {country.name.common}'s Heritege</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="empty">
          No countries found matching your search.
        </div>
      )}
    </div>
    </div>
  );
};

export default Countries;