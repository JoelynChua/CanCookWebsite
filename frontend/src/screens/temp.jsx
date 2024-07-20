import React, { useState } from 'react';
import ReviewsDisplay from '../components/reviewsDisplay'; // Adjust the import path based on your project structure
// import NaviBar from '../components/naviBar'; // Import your NavBar component
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function Temp() {
  const [showReviews, setShowReviews] = useState(false);
  const recipeID = '-O-ga-1FwQTfmPkstbBu'; // Example static recipeID for testing
  const userID = '-NzZ8BoZIR7Ojom64STS'; // Example static userID for testing

  const handleButtonClick = () => {
    setShowReviews(true);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      {/* <NaviBar /> Render your NavBar component */}
      <div className="max-w-screen-lg w-full mt-16"> {/* Adjust the top margin as needed */}
        <div className="flex justify-center items-center">
          {!showReviews ? (
            <button
              className="px-6 py-3 text-white bg-blue-600 rounded-md"
              onClick={handleButtonClick}
            >
              Show Reviews
            </button>
          ) : (
            <ReviewsDisplay recipeID={recipeID} userID={userID} /> // Pass the static recipeID and userID
          )}
        </div>
      </div>
    </div>
  );
};

export default Temp;
