import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cuisine from './Cuisine';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountryData();
  }, [id]);

  const fetchCountryData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      if (!response.ok) throw new Error('Country not found');
      const data = await response.json();
      setCountry(data[0]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error">
      <p>Country not found</p>
      <Link to="/countries" className="btn">Back to Countries</Link>
    </div>
  );

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <img src={country.flags?.png} alt="flag" className="flag" />
        <div className="info">
          <h1>{country.name.common}</h1>
          <p>{country.name.official}</p>
          <p>{country.region} • {country.subregion}</p>
        </div>
      </div>

      <div className="container">
        {/* Basic Info */}
        <div className="grid">
          <div className="card">
            <h2>Overview</h2>
            <div className="details">
              <div><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</div>
              <div><strong>Population:</strong> {country.population?.toLocaleString()}</div>
              <div><strong>Area:</strong> {country.area?.toLocaleString()} km²</div>
              <div><strong>Currency:</strong> {country.currencies ? 
                Object.values(country.currencies)[0]?.name : 'N/A'}</div>
            </div>
          </div>

          <div className="card">
            <h3>Culture</h3>
            <div><strong>Languages:</strong></div>
            <div className="tags">
              {country.languages ? Object.values(country.languages).map((lang, i) => (
                <span key={i} className="tag">{lang}</span>
              )) : 'N/A'}
            </div>
            <button className="btn book">📅 Book Trip</button>
          </div>
        </div>

        {/* Cuisine Component */}
        <Cuisine countryName={country.name.common} />

        <Link to="/countries" className="btn back">← Back</Link>
      </div>
    </div>
  );
};

export default CountryDetails;