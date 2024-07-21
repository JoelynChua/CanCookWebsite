const db = require('../config/firebase');
const wishlist = require('../models/wishlistModel');

// GET
exports.getAllWishlists = async () => {
  const snapshot = await db.ref('wishlist').once('value');
  const indiv_wishlist = snapshot.val();
  return Object.keys(indiv_wishlist).map(key => new wishlist(key, indiv_wishlist[key].UserID, indiv_wishlist[key].RecipeID));
};

exports.getWishlistByID = async (wishlistID) => {
  const snapshot = await db.ref(`wishlist/${wishlistID}`).once('value');
  const indiv_wishlist = snapshot.val();
  
  if (indiv_wishlist) {
    return (wishlistID, indiv_wishlist.UserID, indiv_wishlist.RecipeID);
  } else {
    return null; 
  }
};

// POST
exports.addWishlist = async (newWishlist) => {
  const WishlistRef = db.ref('wishlist').push();
  await WishlistRef.set(newWishlist);
  return new wishlist(WishlistRef.key, newWishlist.UserID, newWishlist.RecipeID);
};

// DELETE
exports.deleteWishlist = async (wishlistID) => {
  const wishlistRef = db.ref(`wishlist/${wishlistID}`);
  await wishlistRef.remove();
  return `Wishlist ${wishlistID} deleted successfully.`;
};