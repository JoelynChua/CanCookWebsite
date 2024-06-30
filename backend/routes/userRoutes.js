const express = require('express');
const userController = require('../controllers/userController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

router.get('/wishlists', wishlistController.getAllWishlists);
router.get('/wishlists/:id', wishlistController.getWishlistByID);
router.post('/wishlists', wishlistController.addWishlist);
router.delete('/wishlists/:id', wishlistController.deleteWishlist);

module.exports = router;