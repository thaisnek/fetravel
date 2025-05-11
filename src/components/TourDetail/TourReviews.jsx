import React, { useState, useEffect } from 'react';
import { getReviewsByTourId } from '../../services/api';

const TourReviews = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByTourId(tourId);
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (tourId) {
      fetchReviews();
    }
  }, [tourId]);

  if (loading) {
    return <div>Đang tải đánh giá...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div id="partials_reviews">
      {reviews.length === 0 ? (
        <p>Chưa có đánh giá nào cho tour này.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-item">
            <p>
              <strong>{review.username}</strong> ({review.rating}/5): {review.comment}
              <br />
              <small>{new Date(review.timestamp).toLocaleDateString('vi-VN')}</small>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TourReviews;