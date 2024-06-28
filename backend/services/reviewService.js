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

const postReview = async (user, recipeID, rating, comments) => {
    //check if user exist
    const userSnapshot = await db.ref(`users/${user}`).once('value');
    if (!userSnapshot.exists()) {
        throw new Error('User not found');
    }
    //Check if the recipe exists
    const recipeSnapshot = await db.ref(`recipes/${recipeID}`).once('value');
    if (!recipeSnapshot.exists()) {
        throw new Error('Recipe not found.');
    }
    // Check if the review by the same user for the same recipe already exists
    const snapshot = await db.ref('reviews')
        .orderByChild('user')
        .equalTo(user)
        .once('value');

    const reviewsData = snapshot.val();
    if (reviewsData) {
        const existingReview = Object.values(reviewsData).find(r => r.recipe === recipeID);
        if (existingReview) {
            throw new Error('User has already reviewed this recipe!');
        }
    }
    const newReview = new Review(null, user, username, recipeID, rating, comments, new Date().toISOString(), new Date().toISOString());
    const reviewRef = await db.ref('reviews').push();
    await reviewRef.set({
        user: newReview.user,
        username: newReview.username,
        recipe: newReview.recipe,
        rating: newReview.rating,
        comments: newReview.comments,
        createdAt: newReview.createdAt,
        editedAt: newReview.editedAt // Track edits 
    });
    newReview.id = reviewRef.key;
    return newReview;

}; //

const editReview = async (reviewID, userID, newComments) => {
    try {
        // Validate newComments (example validation function)
        if (!isValidComments(newComments)) {
            throw new Error('Invalid comments format or length');
        }
        reviewID = reviewID.trim();
        //console.log('Review ID before constructing reviewRef:', reviewID);
        const reviewRef = db.ref(`reviews/${reviewID}`);
        //console.log('Firebase reference path:', reviewRef.toString()); // Log the Firebase reference path
        
        const snapshot = await reviewRef.once('value');
        const reviewData = snapshot.val();

        if (!reviewData) {
            throw new Error('Review not found');
        }

        // Check if the user is authorized to edit this review
        if (reviewData.user !== userID) {
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

const isValidComments = (comments) => {
    // Example validation function
    return typeof comments === 'string' && comments.trim().length > 0 && comments.length <= 1000;
};




module.exports = { postReview, editReview, getReviewsByRecipeID, isValidComments };