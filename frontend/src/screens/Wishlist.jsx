import React, { useState, useEffect } from 'react';
import {getAllWishlists, addWishlist} from '../services/wishlistService';
// import { deleteWishlist } from '../../../backend/services/wishlistService';

// function Wishlist() {
//   return (
//     <div className='flex justify-center items-center w-full h-screen'>
//       <h1>Wishlist</h1>
//     </div>
//   )
// }

const Wishlist = () => {
  const [userID, setUserID] = useState('');
  const [recipeID, setRecipeID] = useState('');
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
        fetchWishlists();
      }, []);
    
      const fetchWishlists = async () => {
        try {
          const wishlists = await getAllWishlists();
          setWishlists(wishlists);
        } catch (error) {
          console.error('Failed to fetch wishlists:', error);
        }
      };

  const handleCreate = async (newWish) => {
    newWish.preventDefault();
    try {
      const newWishlist = await addWishlist(userID, recipeID);
      setWishlists([...wishlists, newWishlist]);
    } catch (error) {
      console.error('Failed to create wishlist:', error);
    }
  };


  return (
    <div>
      <h1>Create Wishlist</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={userID}
          onChange={(newWish) => setUserID(newWish.target.value)}
          placeholder="User ID"
          required
        />
        <input
          type="text"
          value={recipeID}
          onChange={(newWish) => setRecipeID(newWish.target.value)}
          placeholder="Recipe ID"
          required
        />
        <button type="submit">Add Wishlist</button>
      </form>

      {/* Start of Display */}
      <h2>Wishlists</h2>
      <ul>
        {wishlists.map((wishlist) => (
          <li key={wishlist.id}>
            {wishlist.UserID} - {wishlist.RecipeID} <button> X </button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Wishlist;
// <button onClick={()=> deleteWishlist(wishlist.id)}> X </button>
// const Wishlist = () => {
//   const [wishlists, setWishlists] = useState([]);

//   useEffect(() => {
//     fetchWishlists();
//   }, []);

//   const fetchWishlists = async () => {
//     try {
//       const wishlists = await getAllWishlists();
//       setWishlists(wishlists);
//     } catch (error) {
//       console.error('Failed to fetch wishlists:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Wishlists</h1>
//       <ul>
//         {wishlists.map(wishlist => (
//           <li key={wishlist.id}>
//             {wishlist.UserID} - {wishlist.RecipeID}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
