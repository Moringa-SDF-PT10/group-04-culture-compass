import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';

const Reviews =() => {
  const [reviews, setReviews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/reviews').then(res => res.json()),
      fetch('https://restcountries.com/v3.1/all').then(res => res.json())
    ]).then(([reviewsData, countriesData]) => {
      setReviews(reviewsData);
      setCountries(countriesData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <p>Loading reviews...</p>;

  let filteredReviews = reviews;
  
  if (filterCountry) {
    const selectedCountry = countries.find(c => c.cca3 === filterCountry);
  if (selectedCountry) {
    const countryName = selectedCountry.name.common;
    filteredReviews = filteredReviews.filter(r => r.country === countryName);
  }
  }

   if (filterRating) {
    filteredReviews = filteredReviews.filter(r => r.rating === parseInt(filterRating));
  }

  if (sortBy === 'rating') {
    filteredReviews.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'latest') {
    filteredReviews.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
  }

  const countryOptions = countries
    .map(c => ({ code: c.cca3, name: c.name.common }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h2>All Reviews</h2>
      <div className='country-filter'>
        <label>
          Filter by Country:{' '}
          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
            <option value="">All</option>
            {countryOptions.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </label>
        <div className='rating-filter'>
          <label>
          Filter by Rating:
          <select value={filterRating} onChange={e => setFilterRating(e.target.value)}>
            <option value="">All</option>
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </label>
        </div>
        <div className='sort-by'>
           <label>
          Sort by:{' '}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="rating">Rating</option>
          </select>
        </label>
</div>
      </div>

      {filteredReviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
     filteredReviews.map(review => (
  <div key={`${review.country}-${review.id}`}>
    <h4>{review.country}</h4>
    <ReviewCard review={review} />
  </div>
))
)}
<Link to="/countries" className="btn back">← Back to Countries</Link>
    </div>
  );
}

export default Reviews;

