import ReviewCard from './ReviewCard';

export default function AllReviewsPage({ countries }) {
  let allReviews = countries.flatMap(country =>
    (country.reviews  || []).map((review) => ({
      ...review,
      countryName: country.name
    }))
  );

  return (
    <div>
      <h2>All Reviews</h2>
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
