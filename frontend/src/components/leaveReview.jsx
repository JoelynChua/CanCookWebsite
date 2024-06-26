// LeaveReview.js
import React, { useState } from 'react';
import '../styles/LeaveReview.css';
import StarRating from './starRating'; // Adjust path based on your actual project structure

const LeaveReview = ({ reviewCount, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commentEntered, setCommentEntered] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setComment(value);
        setCommentEntered(value !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddReview(rating, comment);
        setRating(0);
        setComment('');
        setCommentEntered(false);
    };

    return (
        <main className="leave-review-container">
            <h1 className="self-center text-2xl font-semibold underline">Reviews ({reviewCount})</h1>
            <p className="self-center mt-8 text-x0 max-md:max-w-full">
                See what others have to say, and even make a review yourself!
            </p>
            <div className="review-section">
                <div className="rating-section">
                    <h2 className="self-start mt-8 text-3xl text-black">Your Rating</h2>
                    <StarRating initialRating={rating} onChange={handleRatingChange} />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
    );
};

export default LeaveReview;
