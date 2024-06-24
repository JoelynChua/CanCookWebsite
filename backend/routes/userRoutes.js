const express = require('express');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewsController');


const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

//router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:recipeID', reviewController.getReviewsByRecipeID);
router.post('/reviews', reviewController.postReview);
router.put('/reviews/:reviewID', reviewController.editReview);

module.exports = router;