// import React, { useState, useEffect, useCallback } from 'react';
// import LeaveReview from './leaveReview';
// import RatingsDisplay from './ratingsDisplay';
// import ReviewList from './reviewList';
// import '../styles/ReviewsDisplay.css'; // Ensure correct path to your CSS file
// import { addReview, editReview, fetchReviews } from '../services/reviewService';

// const ReviewsDisplay = ({ recipeID, userID }) => {
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchReviewsData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const data = await fetchReviews(recipeID); // Pass recipeID to fetchReviews
//             setReviews(data);
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [recipeID]);

//     useEffect(() => {
//         fetchReviewsData();
//     }, [fetchReviewsData]);

//     const handleAddReview = (rating, comment) => {
//         const newReview = { user: userID, recipe: recipeID, rating: rating, comments: comment };
//         addReview(newReview)
//             .then(addedReview => {
//                 setReviews(prevReviews => [...prevReviews, addedReview]);
//                 setError(null); // Clear any previous errors
//                 alert("Your review was posted successfully.");
//             })
//             .catch(error => {
//                 console.error('Error adding review:', error); // Debug log
//                 console.log("reached here");
//                 console.error('Error adding review 123:', error); // Debug log
//                 setError(error.message); //Set error state based on server response
//                 alert(`Error: ${error.message}`);
//             });
//     };

//     const handleEditReview = (reviewID, newComment) => {
//         editReview(reviewID, newComment)
//             .then(updatedReview => {
//                 setReviews(prevReviews =>
//                     prevReviews.map(review => (review.id === reviewID ? updatedReview : review))
//                 );
//                 setError(null);
//                 alert("Your comment was updated successfully.");
//             })
//             .catch(error => {
//                 setError(error.message);
//                 alert(`Error: ${error.message}`);
//             });
//     };

//     return (
//         <div className="reviews-display">
//             <LeaveReview reviewCount={reviews.length} onAddReview={handleAddReview} recipeID={recipeID} userID={userID} />
//             <div className="w-full border-black border-t"></div>
//             <RatingsDisplay reviews={reviews} />
//             <div className="w-full border-black border-t"></div>
//             <ReviewList reviews={reviews} onEditReview={handleEditReview} userID={userID} />
//         </div>
//     );
// };

// export default ReviewsDisplay;

import React, { useState, useEffect, useCallback } from 'react';
import RatingsDisplay from './ratingsDisplay';
import ReviewList from './reviewList';
import '../styles/LeaveReview.css';
import '../styles/ReviewsDisplay.css'; // Ensure correct path to your CSS file
import { addReview, editReview, fetchReviews } from '../services/reviewService';
import { FaStar } from 'react-icons/fa';

const comments = {
    1: "Distraught. Way below my expectations.",
    2: "Disappointed. I’d expected more.",
    3: "Satisfied. Met my expectations.",
    4: "Delighted. Exceeded my expectations.",
    5: "Blown away. Far exceeded my expectations."
};

const ReviewsDisplay = ({ recipeID, userID }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
    const [commentEntered, setCommentEntered] = useState(false);

    const fetchReviewsData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchReviews(recipeID);
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

    const handleAddReview = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        const newReview = { user: userID, recipeID, rating, comments: comment };
        try {
            const addedReview = await addReview(newReview);
            setReviews(prevReviews => [...prevReviews, addedReview]);
            setRating(0);
            setComment('');
            setCommentEntered(false);
            setError(null);
            alert("Your review was posted successfully.");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            setError(errorMessage);
            console.log('Error adding review:', errorMessage);
            alert(`${errorMessage}`);
        }
    };

    const handleEditReview = async (reviewID, newComment) => {
        try {
            const updatedReview = await editReview(reviewID, newComment);
            setReviews(prevReviews =>
                prevReviews.map(review => (review.id === reviewID ? updatedReview : review))
            );
            setError(null);
            alert("Your comment was updated successfully.");
        } catch (error) {
            setError(error.message);
            alert(`Error: ${error.message}`);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setComment(value);
        setCommentEntered(value !== '');
    };

    const handleMouseEnter = (ratingValue) => {
        setHover(ratingValue);
    };

    const handleMouseLeave = () => {
        setHover(null);
    };

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        handleRatingChange(ratingValue);
    };

    return (
        <div className="reviews-display">
            <main className="leave-review-container">
                <h1 className="self-center text-2xl font-semibold underline">Reviews ({reviews.length})</h1>
                <p className="self-center mt-8 text-x0 max-md:max-w-full">
                    See what others have to say, and even make a review yourself!
                </p>
                <div className="review-section">
                    <div className="rating-section">
                        <h2 className="self-start mt-8 text-3xl text-black">Your Rating</h2>
                        <div className="rating-container">
                            <div className="rating-stars">
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={ratingValue}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => handleClick(ratingValue)}
                                                style={{ display: 'none' }}
                                            />
                                            <span
                                                className={`review-star ${ratingValue <= (hover || rating) ? 'review-star-filled' : 'review-star-empty'}`}
                                                onMouseEnter={() => handleMouseEnter(ratingValue)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <FaStar className="rating-stars"/>
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                            <div className="rating-comment">
                                {comments[hover || rating]}
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleAddReview} className="flex flex-col w-full">
                        <label htmlFor="reviewText" className="sr-only">Share your experience</label>
                        <textarea
                            id="reviewText"
                            className={`items-start px-6 pt-8 pb-28 w-full text-xl bg-white text-stone-400 
                                        ${commentEntered ? 'text-black' : 'text-stone-400'}
                                        max-md:px-5 max-md:max-w-full`}
                            placeholder="Share your experience! Did you improve on this recipe?"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                        <button
                            type="submit"
                            className="justify-center self-end px-11 py-4 mt-7 text-xs font-extrabold text-center whitespace-nowrap bg-amber-500 border-2 border-black border-solid shadow-sm rounded-[50px] max-md:px-5"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </main>
            <div className="w-full border-black border-t"></div>
            <RatingsDisplay reviews={reviews} />
            <div className="w-full border-black border-t"></div>
            <ReviewList reviews={reviews} onEditReview={handleEditReview} userID={userID} />
        </div>
    );
};

export default ReviewsDisplay;

