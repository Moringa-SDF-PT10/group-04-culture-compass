import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div>
      <div >
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            fill={review.rating >= num ? 'currentColor' : 'none'}
          />
        ))}
        <span >
          ({review.rating}/5)
        </span>
      </div>
      <p >{review.comment}</p>
      <p className="review-date"></p>
            {review.timestamp ? (
              <p>Reviewed on: {new Date(review.timestamp).toLocaleDateString()}</p>) : 
              (<p>Reviewed on: Date not available</p>)}
        </div>
  );
}
