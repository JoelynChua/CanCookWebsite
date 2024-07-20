const Review = require("../models/reviewModel");

const db = require('../config/firebase');

// Function to get reviews by Recipe ID
const getReviewsByRecipeID = async (recipeID) => {
    try {
        const snapshot = await db.ref('reviews')
            .orderByChild('recipe')
            .equalTo(recipeID)
            .once('value');

        const reviewsData = snapshot.val();

        if (reviewsData === null || Object.keys(reviewsData).length === 0) {
            return [];
        }

        const reviews = Object.keys(reviewsData).map(key => {
            const data = reviewsData[key];
            return new Review(
                key,
                data.user,
                data.username,
                data.recipe,
                data.rating,
                data.comments,
                data.createdAt,
                data.editedAt

            );
        });

        return reviews;
    } catch (error) {
        console.error('Error getting reviews by Recipe ID:', error);
        throw error;
    }
};

//// Function to POST reviews
const postReview = async (user, recipeID, rating, comments) => {
    try {
        // Check if user exists
        const userSnapshot = await db.ref(`users/${user}`).once('value');
        if (!userSnapshot.exists()) {
            console.log('User not found');
            throw new Error('User not found');
        }
        //Get username from user data
        const userData = userSnapshot.val();
        const username = userData.username;
        console.log(username)

        // Check if the recipe exists
        const recipeSnapshot = await db.ref(`recipes/${recipeID}`).once('value');
        if (!recipeSnapshot.exists()) {
            console.log('Recipe not found.');
            throw new Error('Recipe not found.');
        }

        // Check if the user has already reviewed this recipe
        const reviewsSnapshot = await db.ref('reviews')
            .orderByChild('user')
            .equalTo(user)
            .once('value');

        const reviewsData = reviewsSnapshot.val();
        if (reviewsData) {
            const existingReview = Object.values(reviewsData).find(r => r.recipe === recipeID);
            if (existingReview) {
                console.log('User has already reviewed this recipe!');
                throw new Error('You have already reviewed this recipe!');
            }
        }

        // Save new review
        const newReview = {
            user: user,
            username: username,
            recipe: recipeID,
            rating: rating,
            comments: comments,
            createdAt: new Date().toISOString(),
            editedAt: null // Track edits 
        };

        const reviewRef = await db.ref('reviews').push();
        await reviewRef.set(newReview);
        newReview.id = reviewRef.key;

        return newReview;
    } catch (error) {
        console.error('Error posting review:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};


// 
//Function to Edit reviews 
const editReview = async (reviewID, user, newComments) => {
    try {
        const reviewRef = db.ref(`reviews/${reviewID}`);
        const snapshot = await reviewRef.once('value');
        const reviewData = snapshot.val();

        if (!reviewData) {
            throw new Error('Review not found');
        }

        // Check if the user is authorized to edit this review
        if (reviewData.user !== user) {
            throw new Error('Unauthorized: You are not allowed to edit this review');
        }

        const updatedReview = {
            ...reviewData,
            comments: newComments,
            editedAt: new Date().toISOString()
        };

        await reviewRef.update(updatedReview);

        return updatedReview;
    } catch (error) {
        console.error('Error editing review:', error);
        throw error; // Propagate the error to be handled in the controller
    }
};

//validate comments
const isValidComments = (comments) => {
    // Example validation function
    return typeof comments === 'string' && comments.trim().length > 0 && comments.length <= 1000;
};

  

module.exports = { postReview, editReview, getReviewsByRecipeID, isValidComments };

// const Review = require("../models/reviewModel");
// const db = require('../config/firebase');
// const { getAuth, verifyIdToken } = require('firebase-admin/auth');

// const auth = getAuth(); // Firebase Admin Authentication instance

// // Function to get reviews by Recipe ID
// const getReviewsByRecipeID = async (recipeID) => {
//     try {
//         const snapshot = await db.ref('reviews')
//             .orderByChild('recipe')
//             .equalTo(recipeID)
//             .once('value');

//         const reviewsData = snapshot.val();

//         if (reviewsData === null || Object.keys(reviewsData).length === 0) {
//             return [];
//         }

//         const reviews = Object.keys(reviewsData).map(key => {
//             const data = reviewsData[key];
//             return new Review(
//                 key,
//                 data.user,
//                 data.username,
//                 data.recipe,
//                 data.rating,
//                 data.comments,
//                 data.createdAt,
//                 data.editedAt
//             );
//         });

//         return reviews;
//     } catch (error) {
//         console.error('Error getting reviews by Recipe ID:', error);
//         throw error;
//     }
// };

// // Function to post a review
// const postReview = async (userToken, recipeID, rating, comments) => {
//     try {
//         // Verify Firebase ID token
//         const decodedToken = await verifyIdToken(auth, userToken);
//         const uid = decodedToken.uid;

//         // Check if the recipe exists
//         const recipeSnapshot = await db.ref(`recipes/${recipeID}`).once('value');
//         if (!recipeSnapshot.exists()) {
//             throw new Error('Recipe not found.');
//         }

//         // Check if the user exists
//         const userSnapshot = await db.ref(`users/${uid}`).once('value');
//         if (!userSnapshot.exists()) {
//             throw new Error('User not found');
//         }

//         // Check if the review by the same user for the same recipe already exists
//         const snapshot = await db.ref('reviews')
//             .orderByChild('user')
//             .equalTo(uid)
//             .once('value');

//         const reviewsData = snapshot.val();
//         if (reviewsData) {
//             const existingReview = Object.values(reviewsData).find(r => r.recipe === recipeID);
//             if (existingReview) {
//                 throw new Error('User has already reviewed this recipe!');
//             }
//         }

//         const newReview = new Review(null, uid, null, recipeID, rating, comments, new Date().toISOString(), null);
//         const reviewRef = await db.ref('reviews').push();
//         await reviewRef.set({
//             user: newReview.user,
//             recipe: newReview.recipe,
//             rating: newReview.rating,
//             comments: newReview.comments,
//             createdAt: newReview.createdAt,
//             editedAt: newReview.editedAt // Track edits 
//         });
//         newReview.id = reviewRef.key;
//         return newReview;
//     } catch (error) {
//         console.error('Error posting review:', error);
//         throw error;
//     }
// };

// // Function to edit a review
// const editReview = async (reviewID, userID, newComments) => {
//     try {
//         // Validate newComments
//         if (!isValidComments(newComments)) {
//             throw new Error('Invalid comments format or length');
//         }

//         // Check if the review exists
//         const reviewRef = db.ref(`reviews/${reviewID}`);
//         const snapshot = await reviewRef.once('value');
//         const reviewData = snapshot.val();

//         if (!reviewData) {
//             throw new Error('Review not found');
//         }

//         // Check if the user is authorized to edit this review
//         if (reviewData.user !== userID) {
//             throw new Error('Unauthorized: You are not allowed to edit this review');
//         }

//         const updatedReview = {
//             ...reviewData,
//             comments: newComments,
//             editedAt: new Date().toISOString()
//         };

//         await reviewRef.update(updatedReview);

//         return updatedReview;
//     } catch (error) {
//         console.error('Error editing review:', error);
//         throw error;
//     }
// };

// // Function to validate comments
// const isValidComments = (comments) => {
//     // Example validation function
//     return typeof comments === 'string' && comments.trim().length > 0 && comments.length <= 1000;
// };

// module.exports = { postReview, editReview, getReviewsByRecipeID, isValidComments };
