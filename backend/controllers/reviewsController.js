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
    console.log("Request Body:", req.body);

    const { user, recipeID, rating, comments } = req.body;

    try {
        // 1. Validate User Authentication
        if (!user) {
            return res.status(401).json({ error: 'Please login/Signup to post a review.' });
        }

        // 2. Validate Required Fields
        if (!rating || !comments) {
            console.log("Missing fields");
            return res.status(400).json({ error: 'All fields (rating, comments) are required.' });
        }

        // 3. Validate Rating
        const parsedRating = parseInt(rating, 10);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
        }

        // 4. Post Review
        const newReview = await reviewService.postReview(user, recipeID, parsedRating, comments);
        console.log("Review Posted Successfully");
        return res.status(201).json(newReview);
        
    } catch (error) {
        console.error('Error adding review:', error);

        // 5. Handle Errors
        let statusCode = 500;
        let errorMessage = 'Internal Server Error';

        if (error.message === 'User not found' || error.message === 'Recipe not found') {
            statusCode = 404;
            errorMessage = error.message;
        } else if (error.message === 'You have already reviewed this recipe!') {
            statusCode = 400;
            errorMessage = error.message;
        }

        return res.status(statusCode).json({ error: errorMessage });
    }
};


// Endpoint to edit reviews
const editReview = async (req, res) => {
    // const { reviewID } = req.params;
    const { reviewID, user, newComments } = req.body;
    console.log('Review ID:', reviewID);

    try {
          // Validate reviewID
          if (!reviewID || typeof reviewID !== 'string' || reviewID.trim().length === 0) {
            console.log('Invalid reviewID:', reviewID);
            return res.status(400).json({ error: 'Invalid review ID' });
        }
   
        // Validate newComments
        if (!reviewService.isValidComments(newComments)) {
            return res.status(400).json({ error: 'Invalid comments format or length' });
        }

        const updatedReview = await reviewService.editReview(reviewID, user, newComments);
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error editing review:', error);
        if (error.message === 'Unauthorized: You are not allowed to edit this review') {
            return res.status(403).json({ message: 'Unauthorized: You are not allowed to edit this review' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { postReview, editReview, getReviewsByRecipeID };