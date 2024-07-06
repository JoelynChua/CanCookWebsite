const WishlistService = require('../services/wishlistService');

exports.getAllWishlists = async (req, res) => {
  try {
    const wishlists = await WishlistService.getAllWishlists();
    res.json(wishlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getWishlistByID = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await WishlistService.getWishlistByID(id);
    if (wishlist) {
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ error: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

exports.deleteWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.deleteWishlist(req.params.id);
    if (wishlist) {
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ error: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error.message)
  }
};

