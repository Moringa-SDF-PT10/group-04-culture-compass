import React, { useState } from 'react';
import ReviewCard from './ReviewCard';

export default function Reviews({ countries }) {
  const [filterCountry, setFilterCountry] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  let allReviews = countries.flatMap(country =>
    (country.reviews  || []).map((review) => ({
      ...review,
      countryName: country.name
    }))
  );

  
  if (filterCountry) {
    allReviews = allReviews.filter(r => r.countryName === filterCountry);
  }

  if (filterType) {
    allReviews = allReviews.filter(r => r.type === filterType);
  }

  if (sortBy === 'rating') {
    allReviews.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'latest') {
    allReviews.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
  }

  const uniqueCountries = [...new Set(countries.map(c => c.name))];
  const uniqueTypes = [...new Set(allReviews.map(r => r.type))];

  return (
    <div>
      <h2>All Reviews</h2>
      <div className='country-filter'>
        <label>
          Filter by Country:{' '}
          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
            <option value="">All</option>
            {uniqueCountries.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
<div className='filter-type'>
 <label >
          Filter by Type:{' '}
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
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

      {allReviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
     allReviews.map(review => (
  <div key={`${review.countryName}-${review.id}`}>
    <h4>{review.countryName}</h4>
    <ReviewCard review={review} />
  </div>
))

      )}
    </div>
  );
}

