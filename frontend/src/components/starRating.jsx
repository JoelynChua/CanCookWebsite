// // src/components/StarRating.jsx

// import React, { useState } from 'react';
// import { FaStar } from "react-icons/fa";
// import styles from './../styles/StarRating.css'; // Adjust path as per your project structure

// const StarRating = () => {
//     const [rating, setRating] = useState(null);
//     const [hover, setHover] = useState(null);

//     return (
//         <div>
//             {
//                 [...Array(5)].map((star, i) => {
//                     const ratingvalue = i + 1;

//                     return (
//                         <label>
//                             <input
//                             type="radio"
//                             name="rating"
//                             value={ratingvalue}
//                             onClick={() => setRating(ratingvalue)}
//                             />
//                             <FaStar className="star" color={ratingvalue <= (hover || rating) ? "#ffc107" : "#757577" } 
//                             size={100} 
//                             onMouseEnter={() => setHover(ratingvalue)}
//                             onMouseLeave={() => setHover(null)}
//                             />
//                         </label>
//                     );
//                 })
//             }
//         </div>
//     );
// };

// export default StarRating;
// src/components/StarRating.jsx

// src/components/StarRating.jsx

// src/components/StarRating.jsx

import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import './../styles/StarRating.css'; // Adjust path as per your project structure

const comments = {
    1: "Distraught. Way below my expectations.",
    2: "Disappointed. I’d expected more.",
    3: "Satisfied. Met my expectations.",
    4: "Delighted. Exceeded my expectations.",
    5: "Blown away. Far exceeded my expectations."
};

const StarRating = ({ initialRating = 0, onChange = () => {} }) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(null);

    const handleMouseEnter = (ratingValue) => {
        setHover(ratingValue);
    };

    const handleMouseLeave = () => {
        setHover(null);
    };

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        onChange(ratingValue);
    };

    return (
        <div className="rating-container">
            <div className="rating-stars">
                {
                    [...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label key={ratingValue}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => handleClick(ratingValue)}
                                />
                                <FaStar
                                    className={`star ${ratingValue <= (hover || rating) ? 'star-filled' : 'star-empty'}`}
                                    onMouseEnter={() => handleMouseEnter(ratingValue)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </label>
                        );
                    })
                }
            </div>
            <div className="rating-comment">
                {comments[hover || rating]}
            </div>
        </div>
    );
};

export default StarRating;
