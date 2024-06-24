const express = require('express');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewsController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', reviewController.postReview);

module.exports = router;