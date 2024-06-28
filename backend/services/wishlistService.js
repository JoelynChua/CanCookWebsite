const db = require('../config/firebase');
const wishlist = require('../models/wishlistModel');

// GET
exports.getAllWishlists = async () => {
  const snapshot = await db.ref('wishlist').once('value');
  const indiv_wishlist = snapshot.val();
  return Object.keys(indiv_wishlist).map(key => new wishlist(key, indiv_wishlist[key].UserID, indiv_wishlist[key].RecipeID));
};

exports.getWishlistByUserID = async (userID) => {
  const snapshot = await db.ref('wishlist').orderByChild('UserID').equalTo(userID).once('value');
  const wishlists = snapshot.val();
  
  if (wishlists) {
    return Object.keys(wishlists).map(key => new wishlist(key, wishlists[key].UserID, wishlists[key].RecipeID));
  } else {
    return [];
  }
};

// POST
exports.addWishlist = async (newWishlist) => {
  const WishlistRef = db.ref('wishlist').push();
  await WishlistRef.set(newWishlist);
  return new wishlist(WishlistRef.key, newWishlist.UserID, newWishlist.RecipeID);
};

// DELETE
exports.deleteWishlist = async (WishlistID) => {
  const wishlistRef = db.ref(`wishlists/${WishlistID}`);
  console.log(WishlistID);
  await wishlistRef.remove();
  return `${WishlistID} deleted successfully.`;
}; 

// exports.getWishlistByID = async (UserID) => {
//   const snapshot = await db.ref(`wishlist/${UserID}`).once('value');
//   const indiv_wishlist = snapshot.val();
  
//   if (indiv_wishlist) {
//     return (wishlist, indiv_wishlist.UserID, indiv_wishlist.RecipeID);
//   } else {
//     return null; 
//   }
// };