
import React, { useState, useEffect } from 'react';
import {getAllWishlists} from '../services/wishlistService';

// function Wishlist() {
//   return (
//     <div className='flex justify-center items-center w-full h-screen'>
//       <h1>Wishlist</h1>
//     </div>
//   )
// }



const Wishlist = () => {
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

  return (
    <div>
      <h1>Wishlists</h1>
      <ul>
        {wishlists.map(wishlist => (
          <li key={wishlist.id}>
            {wishlist.UserID} - {wishlist.RecipeID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

