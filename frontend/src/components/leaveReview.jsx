// // import React, { useState } from 'react';
// // import '../styles/LeaveReview.css';
// // import { addReview, getUserByID } from '../services/reviewService';
// // import { FaStar } from 'react-icons/fa';
// // import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook for authentication
// // const comments = {
// //     1: "Distraught. Way below my expectations.",
// //     2: "Disappointed. I’d expected more.",
// //     3: "Satisfied. Met my expectations.",
// //     4: "Delighted. Exceeded my expectations.",
// //     5: "Blown away. Far exceeded my expectations."
// // };

// // const LeaveReview = ({ userID, recipeID, reviewCount, onAddReview }) => {
// //     console.log("userID:" + userID);
// //     const [rating, setRating] = useState(0);
// //     const [hover, setHover] = useState(null);
// //     const [comment, setComment] = useState('');
// //     const [commentEntered, setCommentEntered] = useState(false);
// //     const [error, setError] = useState(null);

// //     const handleRatingChange = (newRating) => {
// //         setRating(newRating);
// //     };

// //     const handleCommentChange = (e) => {
// //         const { value } = e.target;
// //         setComment(value);
// //         setCommentEntered(value !== '');
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         console.log('Form submitted');
// //         const newReview = {
// //             user: userID,
// //             recipeID,
// //             rating,
// //             comments: comment,

// //         };
// //         console.log('Review data:', newReview); // Add this line
// //         addReview(newReview)
// //             .then(addedReview => {
// //                 onAddReview(addedReview);
// //                 setRating(0);
// //                 setComment('');
// //                 setCommentEntered(false);
// //                 setError(null);
// //             })
// //             .catch(error => {
// //                 console.log(321);
// //                 setError(error.message);

// //             });
// //     };

// //     const handleMouseEnter = (ratingValue) => {
// //         // console.log(`Mouse entered rating ${ratingValue}`);//checks
// //         setHover(ratingValue);
// //     };

// //     const handleMouseLeave = () => {
// //         //console.log(`Mouse left the rating`); //checks
// //         setHover(null);
// //     };

// //     const handleClick = (ratingValue) => {
// //         //console.log(`Clicked on rating ${ratingValue}`);// checks
// //         setRating(ratingValue);
// //         handleRatingChange(ratingValue);
// //     };

// //     return (
// //         <main className="leave-review-container">
// //             <h1 className="self-center text-2xl font-semibold underline">Reviews({reviewCount})</h1>
// //             {error && <p className="text-red-500">{error}</p>} 
// //             <p className="self-center mt-8 text-x0 max-md:max-w-full">
// //                 See what others have to say, and even make a review yourself!
// //             </p>
// //             <div className="review-section">
// //                 <div className="rating-section">
// //                     <h2 className="self-start mt-8 text-3xl text-black">Your Rating</h2>
// //                     <div className="rating-container">
// //                         <div className="rating-stars">
// //                             {[...Array(5)].map((_, i) => {
// //                                 const ratingValue = i + 1;
// //                                 return (
// //                                     <label key={ratingValue}>
// //                                         <input
// //                                             type="radio"
// //                                             name="rating"
// //                                             value={ratingValue}
// //                                             onClick={() => handleClick(ratingValue)}
// //                                             style={{ display: 'none' }} // Hide the radio input
// //                                         />
// //                                         <span
// //                                             className={`review-star ${ratingValue <= (hover || rating) ? 'review-star-filled' : 'review-star-empty'}`}
// //                                             onMouseEnter={() => handleMouseEnter(ratingValue)}
// //                                             onMouseLeave={handleMouseLeave}
// //                                         >
// //                                             <FaStar className="rating-stars"/>
// //                                         </span>
// //                                     </label>
// //                                 );
// //                             })}
// //                         </div>
// //                         <div className="rating-comment">
// //                             {comments[hover || rating]}
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <form onSubmit={handleSubmit} className="flex flex-col w-full">
// //                     <label htmlFor="reviewText" className="sr-only">Share your experience</label>
// //                     <textarea
// //                         id="reviewText"
// //                         className={`items-start px-6 pt-8 pb-28 w-full text-xl bg-white text-stone-400 
// //                                     ${commentEntered ? 'text-black' : 'text-stone-400'}
// //                                     max-md:px-5 max-md:max-w-full`}
// //                         placeholder="Share your experience! How was the recipe?"
// //                         value={comment}
// //                         onChange={handleCommentChange}
// //                     ></textarea>
// //                     <button
// //                         type="submit"
// //                         className="justify-center self-end px-11 py-4 mt-7 text-xs font-extrabold text-center whitespace-nowrap bg-amber-500 border-2 border-black border-solid shadow-sm rounded-[50px] max-md:px-5"
// //                     >
// //                         Post
// //                     </button>
// //                 </form>
// //             </div>
// //         </main>
// //     );
// // };

// // export default LeaveReview;
// import React, { useState } from 'react';
// import '../styles/LeaveReview.css';
// import { addReview } from '../services/reviewService';
// import { FaStar } from 'react-icons/fa';

// const comments = {
//     1: "Distraught. Way below my expectations.",
//     2: "Disappointed. I’d expected more.",
//     3: "Satisfied. Met my expectations.",
//     4: "Delighted. Exceeded my expectations.",
//     5: "Blown away. Far exceeded my expectations."
// };

// const LeaveReview = ({ userID, recipeID, reviewCount, onAddReview }) => {
//     const [rating, setRating] = useState(0);
//     const [hover, setHover] = useState(null);
//     const [comment, setComment] = useState('');
//     const [commentEntered, setCommentEntered] = useState(false);
//     const [error, setError] = useState(null);

//     const handleRatingChange = (newRating) => {
//         setRating(newRating);
//     };

//     const handleCommentChange = (e) => {
//         const { value } = e.target;
//         setComment(value);
//         setCommentEntered(value !== '');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Form submitted');
//         const newReview = { user: userID, recipeID, rating, comments: comment };
//         console.log('Review data:', newReview);
//         try {
//             const addedReview = await addReview(newReview);
//             onAddReview(addedReview);
//             setRating(0);
//             setComment('');
//             setCommentEntered(false);
//             setError(null);
//         } catch (error) {
//             console.log(321);
//             setError(error.message);
//             console.log(error.message);
//         }
//     };

//     const handleMouseEnter = (ratingValue) => {
//         setHover(ratingValue);
//     };

//     const handleMouseLeave = () => {
//         setHover(null);
//     };

//     const handleClick = (ratingValue) => {
//         setRating(ratingValue);
//         handleRatingChange(ratingValue);
//     };

//     return (
//         <main className="leave-review-container">
//             <h1 className="self-center text-2xl font-semibold underline">Reviews({reviewCount})</h1>
//             {/* {error && <p className="text-red-500">{error}</p>} */}
//             <p className="self-center mt-8 text-x0 max-md:max-w-full">
//                 See what others have to say, and even make a review yourself!
//             </p>
//             <div className="review-section">
//                 <div className="rating-section">
//                     <h2 className="self-start mt-8 text-3xl text-black">Your Rating</h2>
//                     <div className="rating-container">
//                         <div className="rating-stars">
//                             {[...Array(5)].map((_, i) => {
//                                 const ratingValue = i + 1;
//                                 return (
//                                     <label key={ratingValue}>
//                                         <input
//                                             type="radio"
//                                             name="rating"
//                                             value={ratingValue}
//                                             onClick={() => handleClick(ratingValue)}
//                                             style={{ display: 'none' }}
//                                         />
//                                         <span
//                                             className={`review-star ${ratingValue <= (hover || rating) ? 'review-star-filled' : 'review-star-empty'}`}
//                                             onMouseEnter={() => handleMouseEnter(ratingValue)}
//                                             onMouseLeave={handleMouseLeave}
//                                         >
//                                             <FaStar className="rating-stars"/>
//                                         </span>
//                                     </label>
//                                 );
//                             })}
//                         </div>
//                         <div className="rating-comment">
//                             {comments[hover || rating]}
//                         </div>
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit} className="flex flex-col w-full">
//                     <label htmlFor="reviewText" className="sr-only">Share your experience</label>
//                     <textarea
//                         id="reviewText"
//                         className={`items-start px-6 pt-8 pb-28 w-full text-xl bg-white text-stone-400 
//                                     ${commentEntered ? 'text-black' : 'text-stone-400'}
//                                     max-md:px-5 max-md:max-w-full`}
//                         placeholder="Share your experience! Did you improve on this recipe?"
//                         value={comment}
//                         onChange={handleCommentChange}
//                     ></textarea>
//                     <button
//                         type="submit"
//                         className="justify-center self-end px-11 py-4 mt-7 text-xs font-extrabold text-center whitespace-nowrap bg-amber-500 border-2 border-black border-solid shadow-sm rounded-[50px] max-md:px-5"
//                     >
//                         Post
//                     </button>
//                 </form>
//             </div>
//         </main>
//     );
// };

// export default LeaveReview;
