import React, { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';
//import { db } from '../../../backend/config/firebase';

// import { ref, onValue } from "firebase/database";
// import { database } from '../../backend/config/firebase';

import { getAllRecipes } from "../services/recipeService";

export default function HomePage() {

  {/* Working on the display of recipe details */ }
  const [recipeList, setrecipeList] = useState([]);
  
  useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes(){
    getAllRecipes()
    .then(response=> {
      console.log(response)
    }).catch(error=> console.log(error.message))
   
}
  //   const recipeRef = collection(db, 'recipes')
  //   getDocs(recipeRef).then(response => {
  //     console.log(response)
  //   }).catch(error=> console.log(error.message))
  // }

  // console.log(recipeList);

  // let ref = getDatabase.ref("/recipes");
  // ref.on("value", snapshot => {
  //   const data = snapshot.val()
  //   console.log(data)
  // })

  // const dbRef = ref(getDatabase());
  // console.log(dbRef);
  // get(child(dbRef, `recpies`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <h1>Homepage</h1>
      <p>testJoelyn123</p>
      <p>testHSU</p>
      <p>testzheqing_part2</p>

      {/* Actual list of tasks */}
      {/* <div>
        {recipeList.map((recipe) => {
          return (
            <div
              key={recipe.recipeName}
              id={recipe._id}
            />
          );
        })}
      </div> */}


    </div>
  )

}
