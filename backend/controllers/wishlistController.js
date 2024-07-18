const WishlistService = require('../services/wishlistService');

exports.getAllWishlists = async (req, res) => {
  try {
    const wishlists = await WishlistService.getAllWishlists();
    res.json(wishlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.getWishlistByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const wishlists = await WishlistService.getWishlistByUserID(userID);
    res.status(200).json(wishlists);
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

exports.GetWishlistID = async (req, res) => {
  try {
    const userID = req.params.userID;
    const recipeID = req.params.recipeID;
    // console.log(userID,recipeID);
    const wishlistID = await WishlistService.GetWishlistID(userID, recipeID);
    if (wishlistID) {
      res.status(200).json({ wishlistID });
    } else {
      res.status(404).json({ message: 'Wishlist item not found' });
    }
  } catch (error) {
    console.error('Failed to get wishlist ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

