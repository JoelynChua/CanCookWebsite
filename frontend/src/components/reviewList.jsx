import React from 'react';
import './../styles/ReviewList.css'; // Adjust the path as per your project structure

const UserReview = ({ username, date, content, rating, isHighlighted = false }) => (
  <article className={`user-review ${isHighlighted ? 'highlighted' : ''}`}>
    <header className="user-review-header">
      <div className="user-review-info">
        <h2 className="user-review-username">{username}</h2>
        <div className="user-review-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>&#9733;</span>
          ))}
        </div>
        <time className="user-review-date">{date}</time>
      </div>
    </header>
    <p className="user-review-content">{content}</p>
  </article>
);

const ReviewList = () => {
  const reviews = [
    {
      username: "User ABC",
      date: "02/06/2024",
      content: "The recipe was really easy to follow! I could make this recipe within five minutes and it's very delicious. Really recommend others to try! Personally, I love adding a little basil to go with it.",
      rating: 4,
    },
    {
      username: "User DEF",
      date: "02/06/2024",
      content: "The recipe was really easy to follow! I could make this recipe within five minutes and it's very delicious. Really recommend others to try! Personally, I love adding a little basil to go with it. Would also recommend: Stove Only Mac-n-Cheese",
      isHighlighted: true,
      rating: 5,
    },
  ];

  return (
    <main className="review-list">
      {reviews.map((review, index) => (
        <UserReview key={index} {...review} />
      ))}
      <button className="review-list-button">Show More</button>
    </main>
  );
};

export default ReviewList;
