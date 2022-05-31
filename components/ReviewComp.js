function ReviewComp({ review }) {
  return (
    <div>
      <h5>Rating: {review.rating}</h5>
      <h5>Comment: {review.comment}</h5>
      <h5>{review.email}</h5>
    </div>
  );
}

export default ReviewComp;
