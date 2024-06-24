const Review = require("../models/reviewModel");
const db = require('../config/firebase');

const getAllReviews = async () => {
    const snapshot = await db.ref('reviews').once('value');
    const reviewsData = snapshot.val();

    if (!reviewsData) {
        return [];
    }
    const reviews = Object.keys(reviewsData).map(key => {
        const data = reviewsData[key];
        return new Review(
            key,
            data.user,
            data.recipe,
            data.rating,
            data.comments, 
            data.createdAt,
            data.editedAt
        );
    });
    return reviews;
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
    const newReview = new Review(null, user, recipeID, rating, comments, new Date().toISOString(), new Date().toISOString());
    const reviewRef = await db.ref('reviews').push();
    await reviewRef.set({
        user: newReview.user,
        recipe: newReview.recipe,
        rating: newReview.rating,
        review: newReview.comments,
        createdAt: newReview.createdAt,
        editedAt: newReview.editedAt // Track edits 
    });
    newReview.id = reviewRef.key;
    return newReview;

}; //

const editReview =  async (reviewID, newComments) => {
    const reviewRef = db.ref(`reviews/${reviewID}`);
    const snapshot = await reviewRef.once('value');
    const reviewData = snapshot.val();

    if (!reviewData) {
        throw new Error('Review not found');
    }

    await reviewRef.update({
        comments: newComments,
        editedAt: new Date().toISOString()
    });

    return {
        id: reviewID,
        user: reviewData.user,
        recipe: reviewData.recipe,
        rating: reviewData.rating,
        comments: newComments,
        createdAt: reviewData.createdAt,
        editedAt: new Date().toISOString()
    };

};




module.exports =  { getAllReviews, postReview, editReview  };