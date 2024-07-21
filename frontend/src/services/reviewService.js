import axiosInstance from "../utils/axiosInstance";
import { getAuth } from "firebase/auth";

const auth = getAuth(); // Firebase authentication instance
const cloudURL = "https://can-cook-website-bw1l.vercel.app";
const localURL = "http://localhost:5000/";
const finalURL = cloudURL;

// Fetch all reviews for a specific recipe
async function fetchReviews(recipeId) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }
        const response = await axiosInstance({
            method: "get",
            url: `${finalURL}/api/recipeDetails/${recipeId}/reviews`,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch reviews for recipe ${recipeId}: ${error.message}`);
    }
}

// Add a new review
async function addReview(newReview) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }
        console.log('Submitting new review:', newReview); // Debug log
        const response = await axiosInstance({
            method: "post",
            url: `${finalURL}/api/reviews`,
            data: newReview,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Extract and handle error message
            const errorMessage = error.response.data.error || error.message;
            console.error("Error adding review:", errorMessage);
            throw new Error(errorMessage);
        } else if (error.request) {
            console.error('Error request data:', error.request);
            throw new Error('No response received from the server.');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Error in setting up the request.');
        }
    } 
}

// Edit an existing review
async function editReview(userID,reviewID, newComments) {
    try {
        const userAuth = auth.currentUser;
        if (!userAuth) {
            throw new Error("User not authenticated.");
        }

        const user = userID;
        const response = await axiosInstance({
            method: "put",
            url: `${finalURL}/api/reviews/${reviewID}`,
            data: { user,reviewID,newComments },
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error editing review:", errorMessage);
        throw new Error(`Failed to edit review: ${errorMessage}`);
    }
}

export { fetchReviews, addReview, editReview };
