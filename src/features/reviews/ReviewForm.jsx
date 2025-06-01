import { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ country, onAddReview }) => {
   const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
   const [countryCode, setCountryCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);

    const newReview = {
      countryCode: countryCode,
      country,
      name,
      rating: parseInt(rating),
      comment,
      timestamp: new Date().toISOString()
    };

    fetch('https://group-04-culture-compass.onrender.com/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then((res) => res.json())
      .then((saved) => {
        onAddReview(saved);
         setName('');
        setRating(0);
        setComment('');
        setCountryCode('');
      })
      .catch((err) => {
        console.error('Failed to submit review:', err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="reviewForm">
      <h3 className="title">Add Review for {country}</h3>
            <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={submitting}
        />
      </label>
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
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment"
          placeholder="Please review me..."
          required
          disabled={submitting}
        />
      </div>

      <button type="submit" className="submit" disabled={submitting}>Review</button>
    </form>
  );
};

export default ReviewForm;
