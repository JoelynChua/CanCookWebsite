import React, { useState } from 'react';
import '../styles/ReviewList.css'; // Adjust path as per your project structure
import { FaPen } from 'react-icons/fa'; // Import the pen icon

// Function to format date as DD/MM/YY
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};

const ReviewList = ({ reviews, onEditReview }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [editComment, setEditComment] = useState('');

    const openEditModal = (review) => {
        setSelectedReview(review);
        setEditComment(review.comments);
    };

    const closeEditModal = () => {
        setSelectedReview(null);
        setEditComment('');
    };

    const handleSaveReview = () => {
        if (selectedReview) {
            onEditReview(selectedReview.id, editComment);
            closeEditModal();
        }
    };

    return (
        <div className="review-list">
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                reviews.map((review, index) => (
                    <article key={index} className="user-review">
                        <header className="user-review-header">
                            <div className="user-review-info">
                                <h2 className="user-review-username">{review.username}</h2>
                                <div className="user-review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`review-list-star ${i < review.rating ? 'filled' : ''}`}>&#9733;</span>
                                    ))}
                                    <time className="user-review-date">{formatDate(review.createdAt)}</time>
                                </div>
                            </div>
                            <div className="edit-review-icon-container">
                                <FaPen className="edit-review-icon" onClick={() => openEditModal(review)} />
                            </div>
                        </header>
                        <p className="user-review-content">{review.comments}</p>
                    </article>
                ))
            )}
            {selectedReview && (
                <div className="edit-review-modal">
                    <h3>Edit Review</h3>
                    <textarea
                        className="edit-review-textarea"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />
                    <div className="edit-review-modal-buttons">
                        <button className="edit-review-save-button" onClick={handleSaveReview}>Save</button>
                        <button className="edit-review-cancel-button" onClick={closeEditModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
