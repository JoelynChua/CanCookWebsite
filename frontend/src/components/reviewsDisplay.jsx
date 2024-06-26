// ReviewsDisplay.js
import React, { useState } from 'react';
import LeaveReview from './leaveReview';
import RatingsDisplay from './ratingsDisplay';
import ReviewList from './reviewList';
import './../styles/ReviewsDisplay.css'; // Ensure to create and adjust the path of this CSS file

const ReviewsDisplay = () => {
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(reviews.length);

    const addReview = (rating, comment) => {
        const newReview = { rating, comment, id: reviews.length + 1 };
        setReviews([...reviews, newReview]);
        setReviewCount(reviews.length + 1);
    };

    return (
        <div className="reviews-display">
            <LeaveReview reviewCount={reviewCount} onAddReview={addReview} />
            <hr className="divider" />
            <RatingsDisplay reviews={reviews} />
            <hr className="divider" />
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default ReviewsDisplay;
