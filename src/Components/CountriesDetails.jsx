import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cuisine from './Cuisine';
import ReviewForm from '../features/reviews/ReviewForm';
import ReviewCard from '../features/reviews/ReviewCard';
import BookingTrip from './BookingTrip';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookedTripDetails, setBookedTripDetails] = useState(null); // New state for successful booking details
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  useEffect(() => {
    fetchCountryData();
  }, [id]);

   useEffect(() => {
    if (country?.name?.common) {
      fetchReviews(country.name.common);
    }
  }, [country]);
//imma add the same function now for getting images instead of flag i put in countries.jsx
  const getCulturalSiteImage = (countryCode) => {
  const seed = countryCode.charCodeAt(0) + countryCode.charCodeAt(1) + countryCode.charCodeAt(2);
  return `https://picsum.photos/seed/${seed}/2000/500`;
};

  const fetchCountryData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      if (!response.ok) throw new Error('Country not found');
     //this is for processing one image per country instead of the 250 i used in countries.jsx
      const data = await response.json();
const countryWithImage = {
  ...data[0],
  culturalImage: getCulturalSiteImage(data[0].cca3)
};


setCountry(countryWithImage);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchReviews = async (countryName) => {
    try {
      const res = await fetch(`https://group-04-culture-compass.onrender.com/reviews?country=${countryName}`);
      const data = await res.json();
      setReviews(data.slice(0, 3));
      } catch (err) {
    console.error('Error loading reviews:', err);
  }
};

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev.slice(0, 2)]);
  };

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    setBookedTripDetails(null); // Clear previous booking details when opening form
  };

  const handleBookingSuccess = (bookingDetails) => {
    setBookedTripDetails(bookingDetails);
    setShowBookingForm(false); // Hide the form
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error-message">
      <p>Country not found</p>
      <Link to="/countries" className="back-btn">Back to Countries</Link>
    </div>
  );

  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="country-page">
      {/* Hero */}
      <div className="country-hero">
        <img 
  src={country.culturalImage} 
  alt={`${country.name.common} cultural site`} 
  className="country-image"/> {/* for rendering images instead of flags*/}
        <div className="country-info">
          <h1>{country.name.common}</h1>
          <p>{country.name.official}</p>
          <p>{country.region} • {country.subregion}</p>
        </div>
      </div>

      <div className="country-container">
        {/* Basic Info */}
        <div className="country-grid">
          <div className="country-card">
            <h2>Overview</h2>
            <div className="overview-details">
              <div><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</div>
              <div><strong>Population:</strong> {country.population?.toLocaleString()}</div>
              <div><strong>Area:</strong> {country.area?.toLocaleString()} km²</div>
              <div><strong>Currency:</strong> {country.currencies ?
                Object.values(country.currencies)[0]?.name : 'N/A'}</div>
            </div>
          </div>

          <div className="country-card">
            <h3>Culture</h3>
            <div><strong>Languages:</strong></div>
            <div className="tags">
              {country.languages ? Object.values(country.languages).map((lang, i) => (
                <span key={i} className="tag">{lang}</span>
              )) : 'N/A'}
            </div>
            <button className="btn book" onClick={toggleBookingForm}><img src="/assets/bookingflight.png"/> Book Trip</button>
          </div>
        </div>

        {/* Display Booking Details if successful */}
        {bookedTripDetails && (
          <div className="country-card">
            <h3>Your Booking Details</h3>
            <table>
              <tbody>
                <tr><td>Name:</td><td>{bookedTripDetails.name}</td></tr>
                <tr><td>Date:</td><td>{bookedTripDetails.date}</td></tr>
                <tr><td>Travelers:</td><td>{bookedTripDetails.travelers}</td></tr>
                {/* Add other details from bookedTripDetails as needed */}
              </tbody>
            </table>
            <button onClick={() => setBookedTripDetails(null)}>Close Details</button>
          </div>
        )}

        {/* Booking Trip Component */}
        {showBookingForm && !bookedTripDetails && (
          <div className>
            <BookingTrip
              countryName={country.name.common}
              countryId={id}
              userId={userId}
              onBooked={handleBookingSuccess}
            />
          </div>
        )}

        {/* Cuisine Component */}
        <Cuisine countryName={country.name.common} />

        {/* Reviews Section */}
        <div className="country-card">
          <h2>Top Reviews</h2>
          {reviews.length > 0 ? (
           [...reviews]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .reverse().map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

        <Link to="/reviews" className="btn view-more">View More Reviews</Link>
        </div>

        {/* Review Form */}
        <div className="country-card">
          <ReviewForm country={country.name.common} onAddReview={handleAddReview} />
        </div>

        <Link to="/countries" className="btn back">← Back</Link>
      </div>
    </div>
  );
};

export default CountryDetails;