const express = require('express');
const cors = require('cors');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewsController');

const app = express();
const router = express.Router();
app.use(cors());

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

//router.get('/reviews', reviewController.getAllReviews);
//router.get('/reviews/:recipeID', reviewController.getReviewsByRecipeID);
router.get('/temp/:recipeID/reviews', reviewController.getReviewsByRecipeID);
router.post('/reviews', reviewController.postReview);
router.put('/reviews/:reviewID', reviewController.editReview);

module.exports = router;