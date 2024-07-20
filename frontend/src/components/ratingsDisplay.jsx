import React from 'react';
import { FaStar } from 'react-icons/fa';
import './../styles/RatingsDisplay.css';

const RatingsDisplay = ({ reviews }) => {
    // Calculate ratings count and total ratings from reviews
    const calculateRatings = () => {
        const ratingsCount = [0, 0, 0, 0, 0];
        let totalRatings = 0;

        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingsCount[review.rating - 1]++;
                totalRatings++;
            }
        });

        return { ratingsCount, totalRatings };
    };

    const { ratingsCount, totalRatings } = calculateRatings();

    // Calculate average rating
    const averageRating = totalRatings === 0 ? 0 : ratingsCount.reduce((acc, count, index) => acc + count * (index + 1), 0) / totalRatings;

    // Calculate full stars, half star, and empty stars
    const fullStars = Math.floor(averageRating);
    const remainder = averageRating % 1;
    let hasHalfStar = false;
    let emptyStars = 5 - fullStars;

    // Determine if there is a half star
    if (remainder >= 0.25 && remainder <= 0.75) {
        hasHalfStar = true;
        emptyStars--;
    }

    // Calculate percentage for each star rating count
    const percentages = ratingsCount.map((count) => (totalRatings === 0 ? 0 : (count / totalRatings) * 100));

    return (
        <div className="ratings-display-container">
            <h2 className="ratings-header">Total Ratings</h2>
            <div className="average-rating-display">
                <div className="avg-rating-stars">
                    {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={`full-${i}`} className="avg-rating-star avg-rating-star-filled" />
                    ))}
                    {hasHalfStar && <FaStar className="avg-rating-star avg-rating-star-half" />}
                    {[...Array(emptyStars)].map((_, i) => (
                        <FaStar key={`empty-${i}`} className="avg-rating-star avg-rating-star-empty" />
                    ))}
                </div>
                <div className="rating-value">{averageRating.toFixed(1)} / 5</div>
            </div>
            <div className="progress-bar-container">
                <div className="rating-label">{totalRatings} Ratings</div>
                {percentages.map((percentage, index) => (
                    <div key={`rating-row-${index}`} className="rating-row">
                        <span className="star-label">{index + 1} stars:</span>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-filled"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <span className="rating-count">{ratingsCount[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingsDisplay;
