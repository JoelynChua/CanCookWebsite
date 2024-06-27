import React, { useState, useEffect, useCallback } from 'react';
import LeaveReview from './leaveReview';
import RatingsDisplay from './ratingsDisplay';
import ReviewList from './reviewList';
import '../styles/ReviewsDisplay.css'; // Ensure correct path to your CSS file
import { fetchReviews, addReview, editReview } from '../services/reviewService';

const ReviewsDisplay = ({ recipeID, userID }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReviewsData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchReviews(recipeID); // Pass recipeID to fetchReviews
            setReviews(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [recipeID]);

    useEffect(() => {
        fetchReviewsData();
    }, [fetchReviewsData]);

    const handleAddReview = (rating, comment) => {
        const newReview = { user: userID, recipeID, rating, comments: comment };
        addReview(newReview)
            .then(addedReview => {
                setReviews(prevReviews => [...prevReviews, addedReview]);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleEditReview = (reviewID, newComment) => {
        editReview(reviewID, newComment)
            .then(updatedReview => {
                setReviews(prevReviews =>
                    prevReviews.map(review => (review.id === reviewID ? updatedReview : review))
                );
                setError(null);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="reviews-display">
            <LeaveReview reviewCount={reviews.length} onAddReview={handleAddReview} />
            <hr className="divider" />
            <RatingsDisplay reviews={reviews} />
            <hr className="divider" />
            <ReviewList reviews={reviews} onEditReview={handleEditReview} />
        </div>
    );
};

export default ReviewsDisplay;
