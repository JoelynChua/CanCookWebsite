const reviewService = require("../services/reviewService");

// Endpoint to get reviews by Recipe ID
const getReviewsByRecipeID = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const reviews = await reviewService.getReviewsByRecipeID(recipeID);
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews by Recipe ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Endpoint to post reviews 
const postReview = async (req, res) => {
    const { user, recipeID, rating, comments } = req.body;

    // Check if user is logged in 
    if (!user) {
        return res.status(401).json({ message: 'Please login/Signup to post a review.' });
    }

    // Check all fields are filled 
    if (!recipeID || !rating || !comments) {
        return res.status(400).json({ message: 'All fields (recipeID, rating, comments) are required.' });
    }

    try {
        // Ensure rating is a number and within a valid range (if applicable)
        const parsedRating = parseInt(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
        }

        const newReview = await reviewService.postReview(user, recipeID, parsedRating, comments);
        return res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);

        let statusCode = 500;
        let errorMessage = 'Internal Server Error';

        if (error.message === 'User not found' || error.message === 'Recipe not found') {
            statusCode = 404;
            errorMessage = error.message;
        } else if (error.message === 'User has already reviewed this recipe!') {
            statusCode = 400;
            errorMessage = error.message;
        }

        return res.status(statusCode).json({ error: errorMessage });
    }
};

// Endpoint to edit reviews
const editReview = async (req, res) => {
    const { reviewID } = req.params;
    const { newComments } = req.body;
    const userID = "-NzZ8BoZIR7Ojom64STS"; // to change 

    try {
        // Validate newComments
        if (!reviewService.isValidComments(newComments)) {
            return res.status(400).json({ error: 'Invalid comments format or length' });
        }

        const updatedReview = await reviewService.editReview(reviewID, userID, newComments);
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error editing review:', error);
        if (error.message === 'Unauthorized: You are not allowed to edit this review') {
            return res.status(403).json({ error: 'Unauthorized: You are not allowed to edit this review' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { postReview, editReview, getReviewsByRecipeID };