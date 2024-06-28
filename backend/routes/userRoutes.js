const express = require('express');
const userController = require('../controllers/userController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

router.get('/wishlists', wishlistController.getAllWishlists);
router.get('/wishlists/users/:userID', wishlistController.getWishlistByUserID);
router.post('/wishlists', wishlistController.addWishlist);
router.delete('/wishlists/:WishlistID', wishlistController.deleteWishlist);

module.exports = router;