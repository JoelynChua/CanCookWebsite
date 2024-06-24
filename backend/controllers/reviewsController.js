const reviewService = require("../services/reviewService");



//Endpoint to retrive a list of all reviews
const getAllReviews = async(req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
      

        console.log('Reviews:', reviews);
        res.status(200).json(reviews);

    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; //

//Endpoint to post reviews 
const postReview = async(req, res) => {
    const { user, recipeID, rating, comments } = req.body;

// check if user is logged in 
    if(!user) {
        return res.status(401).json({ message: 'Please login/Signup to post a review.'});
    }
    // check all fields filled 
    if (!recipeID || !rating || !comments) {
        return res.status(400).json({ message: 'All fields (rating, comment) are required.' });
    }

    try {
        const newReview = await reviewService.postReview(user, recipeID, rating, comments);
        res.status(201).json(newReview);

    } catch (error) {
        console.error('Error adding review:', error);
        if (error.message === 'User not found.' || error.message === 'Recipe not found.') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'User has already reviewed this recipe!') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    

}; //

// Endpoint to edit reviews
const editReview = async (req, res) => {
    const { reviewID, newComments } = req.body;

    if (!reviewID || !newComments) {
        return res.status(400).json({ message: 'Review ID and new comments are required.' });
    }

    try {
        const updatedReview = await reviewService.editReview(reviewID, newComments);
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error editing review:', error);
        if (error.message === 'Review not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};



module.exports =  { getAllReviews, postReview, editReview };