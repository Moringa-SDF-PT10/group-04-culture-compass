import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ReviewForm({ countryId, countryName, onSubmit}) {

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit(countryId, { rating: Number(rating), comment });
    setComment('');
    setRating(0);
  };
   const newReview = {
      rating: Number(rating),
      comment,
      timestamp: new Date().toISOString()
    }
  onSubmit(countryId, newReview);

  return (
    <form onSubmit={handleSubmit} className="reviewForm">
      <h3 className="title">Add Review for {countryName}</h3>
      <div className="rating-content">
        <label className="rating">Rating:</label>
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            onClick={() => setRating(num)}
            className={`${rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
            fill={rating >= num ? 'currentColor' : 'none'}
            required
          />
          
        ))}
        
      </div>
      <div className="review-content">
        <label>Comment: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment"
          placeholder='Please Review me....'
          required
        ></textarea>
      </div>
      
      <button type="submit" className="submit">Review</button>
    </form>
  );
}
