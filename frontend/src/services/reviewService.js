// import axiosInstance from "../utils/axiosInstance";
// import { getAuth } from "firebase/auth";

// const auth = getAuth(); // Firebase authentication instance

// // Fetch all reviews for a specific recipe
// async function fetchReviews(recipeId) {
//     try {
//         const idToken = await auth.currentUser.getIdToken();
//         const response = await axiosInstance({
//             method: "get",
//             url: `http://localhost:5000/api/temp/${recipeId}/reviews`,
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to fetch reviews for recipe ${recipeId}: ${error.message}`);
//     }
// }

// // Add a new review
// async function addReview(newReview) {
//     try {
//         const user = auth.currentUser;
//         if (!user) {
//             throw new Error("User not authenticated.");
//         }
//         console.log(1)
//         // const idToken = await user.getIdToken();
//         const response = await axiosInstance({
//             method: "post",
//             url: "http://localhost:5000/api/reviews",
//             data: newReview,
//             // headers: {
//             //     Authorization: `Bearer ${idToken}`,
//             // },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error adding review:", error);
//         throw new Error(`Failed to add review: ${error.message}`);
//     }
// }

// // Edit an existing review
// async function editReview(reviewID, newComments) {
//     try {
//         const user = auth.currentUser;
//         if (!user) {
//             throw new Error("User not authenticated.");
//         }

//         const idToken = await user.getIdToken();
//         const response = await axiosInstance({
//             method: "put",
//             url: `http://localhost:5000/api/reviews/${reviewID}`,
//             data: { newComments },
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error editing review:", error);
//         throw new Error(`Failed to edit review: ${error.message}`);
//     }
// }

// // Function to fetch username based on userID
// async function fetchUsername(userID) {
//     try {
//         const idToken = await auth.currentUser.getIdToken();
//         const response = await axiosInstance({
//             method: "get",
//             url: `http://localhost:5000/api/users/${userID}/username`,
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//             },
//         });
//         return response.data.username; // Assuming response contains username
//     } catch (error) {
//         throw new Error(`Failed to fetch username for userID ${userID}: ${error.message}`);
//     }
// }



// export {
//     fetchReviews,
//     addReview,
//     editReview,
//     fetchUsername
// };
import axiosInstance from "../utils/axiosInstance";
import { getAuth } from "firebase/auth";

const auth = getAuth(); // Firebase authentication instance

// Fetch all reviews for a specific recipe
async function fetchReviews(recipeId) {
    try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await axiosInstance({
            method: "get",
            url: `http://localhost:5000/api/temp/${recipeId}/reviews`,
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
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
            url: "http://localhost:5000/api/reviews",
            data: newReview,
        });
        return response.data;
    } catch (error) {
        // Extract error message from response if available
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error adding review:", errorMessage);
        throw new Error(`Failed to add review: ${errorMessage}`);
    } 
}

// Edit an existing review
async function editReview(reviewID, newComments) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated.");
        }

        const idToken = await user.getIdToken();
        const response = await axiosInstance({
            method: "put",
            url: `http://localhost:5000/api/reviews/${reviewID}`,
            data: { newComments },
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error editing review:", error);
        throw new Error(`Failed to edit review: ${error.message}`);
    }
}

// Function to fetch username based on userID
async function fetchUsername(userID) {
    try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await axiosInstance({
            method: "get",
            url: `/users/${userID}/username`,
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        return response.data.username; // Assuming response contains username
    } catch (error) {
        throw new Error(`Failed to fetch username for userID ${userID}: ${error.message}`);
    }
}

export { fetchReviews, addReview, editReview, fetchUsername };
