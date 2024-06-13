const WishlistService = require('../services/wishlistService');

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await WishlistService.getWishlists();
    res.json(wishlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getWishlistsByID = async (req, res) => {
    try {
      const wishlists = await WishlistService.getWishlists();
      res.json(wishlists);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

exports.addWishlist = async (req, res) => {
  try {
    const newWishlist= req.body;
    const wishlist = await WishlistService.addWishlist(newWishlist);
    res.json(wishlist);
  } catch (err) {
    res.status(500).send(err.message);
  }
};