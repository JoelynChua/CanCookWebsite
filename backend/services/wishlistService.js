const db = require('../config/firebase');
const wishlist = require('../models/wishlistModel');

// GET
exports.getAllWishlists = async () => {
  const snapshot = await db.ref(`wishlist`).once('value');
  const indiv_wishlist = snapshot.val();
  return Object.keys(indiv_wishlist).map(key => new wishlist(key, indiv_wishlist[key].UserID, indiv_wishlist[key].RecipeID));
};

exports.getWishlistByUserID = async (userID) => {
  try {
    // console.log(userID)
    const snapshot = await db.ref('wishlist').orderByChild('UserID').equalTo(userID).once('value');    
    const wishlists = snapshot.val();
    // console.log(wishlists)

    if (wishlists) {
      return Object.keys(wishlists).map(key => new wishlist(key, wishlists[key].UserID, wishlists[key].RecipeID));
    } 
    else {
      return "error";
    }
  } catch (error) {
    console.error(`Error fetching wishlists for userID ${userID}:`, error.message);
    throw new Error(`Could not fetch wishlists for userID ${userID}`);
  }
};

// POST
exports.addWishlist = async (newWishlist) => {
  const WishlistRef = db.ref('wishlist').push();
  await WishlistRef.set(newWishlist);
  return new wishlist(WishlistRef.key, newWishlist.UserID, newWishlist.RecipeID);
};

// DELETE
// exports.deleteWishlist = async (id) => {
//  // const wishlistRef = db.ref(`wishlist`);
//   const wishlistRef = db.ref(`wishlists/${id}`);
//   console.log(id);
//   await wishlistRef.remove();
//   return `${id} deleted successfully.`;
// }; 

// delete by wishlist ID
exports.deleteWishlist = async (id) => {
  const wishlistRef = db.ref(`wishlist/${id}`);
  const snapshot = await wishlistRef.once('value');
  if (snapshot.exists()) {
    await wishlistRef.remove();
    return { id, message: 'Wishlist deleted successfully' };
  } else {
    return null;
  }
};

// delete by recipe ID
