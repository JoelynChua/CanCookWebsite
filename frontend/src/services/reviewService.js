import axiosInstance from "../utils/axiosInstance";

// Fetch all reviews for a specific recipe
async function fetchReviews(recipeId) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: `http://localhost:5000/api/temp/${recipeId}/reviews`
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch reviews for recipe ${recipeId}: ${error.message}`);
    }
}

// Add a new review
async function addReview(newReview) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "http://localhost:5000/api/reviews",
            data: newReview
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to add review: ${error.message}`);
    }
}

// Edit an existing review
async function editReview(reviewID, newComments) {
    try {
        const response = await axiosInstance({
            method: "put",
            url: `http://localhost:5000/api/reviews/${reviewID}`,
            data: { newComments }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to edit review: ${error.message}`);
    }
}
//  function to fetch username based on userID
async function fetchUsername(userID) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: `http://localhost:5000/api/users/${userID}/username`
        });
        return response.data.username; // Assuming response contains username
    } catch (error) {
        throw new Error(`Failed to fetch username for userID ${userID}: ${error.message}`);
    }
}


export {
    fetchReviews,
    addReview,
    editReview,
    fetchUsername
};
