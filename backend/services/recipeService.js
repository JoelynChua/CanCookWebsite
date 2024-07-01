const db = require('../config/firebase');
const Recipe = require('../models/recipeModel');

// exports.getAllRecipes = async () => {
//   const snapshot = await db.ref('recipes').once('value');
//   const recipe = snapshot.val();
//   return Object.keys(recipe).map(key => new Recipe(key, recipe[key].recipeName, recipe[key].cuisine, recipe[key].duration, 
//     recipe[key].servingSize, recipe[key].calories, recipe[key].ingredients, recipe[key].equipments, recipe[key].steps));
// };

exports.getAllRecipes = async () => {
  const snapshot = await db.ref('recipes').once('value');
  const recipe = snapshot.val();
  return Object.keys(recipe).map((key, index) => new Recipe(key, recipe[key].recipeName, recipe[key].cuisine, recipe[key].duration, 
    recipe[key].servingSize, recipe[key].calories, recipe[key].image, recipe[key].ingredients, recipe[key].equipments, recipe[key].steps, {key: index}));
};

exports.getRecipeById = async (id) => {
  const snapshot = await db.ref(`recipes/${id}`).once('value');
  const recipe = snapshot.val();
  if (!recipe) {
    throw new Error('Recipe not found');
  }
  return new Recipe(
    id, 
    recipe.recipeName, 
    recipe.cuisine, 
    recipe.duration, 
    recipe.servingSize, 
    recipe.calories, 
    recipe.image, 
    recipe.ingredients, 
    recipe.equipments, 
    recipe.steps
  );
};

exports.getRecipesByCuisine = async (cuisine) => {
  const snapshot = await db.ref('recipes').orderByChild('cuisine').equalTo(cuisine).once('value');
  const recipesData = snapshot.val();
  if (!recipesData) {
    throw new Error('No recipes found for the specified cuisine');
  }
  const recipes = [];
  for (const id in recipesData) {
    const recipe = recipesData[id];
    recipes.push(new Recipe(
      id,
      recipe.recipeName,
      recipe.cuisine,
      recipe.duration,
      recipe.servingSize,
      recipe.calories,
      recipe.image,
      recipe.ingredients,
      recipe.equipments,
      recipe.steps
    ));
  }
  return recipes;
};


// exports.getRecipesByIngredients = async (ingredients) => {
//   try {
//     const normalizedIngredients = ingredients.map(ingredient => 
//       ingredient.toLowerCase().trim().replace(/\d+\s*\w*\s*of\s*/g, '') // Remove quantities and "of"
//     );

//     const snapshot = await db.ref('recipes').once('value');
//     const recipesData = snapshot.val();

//     if (!recipesData) {
//       throw new Error('No recipes found in the database');
//     }

//     const matchingRecipes = [];

//     for (const id in recipesData) {
//       const recipe = recipesData[id];
//       const recipeIngredients = recipe.ingredients || [];

//       const normalizedRecipeIngredients = recipeIngredients.map(ingredient =>
//         ingredient.toLowerCase().trim().replace(/\d+\s*\w*\s*of\s*/g, '') // Remove quantities and "of"
//       );

//       // More flexible matching using .some() and .includes()
//       if (normalizedIngredients.some(ingredient =>
//         normalizedRecipeIngredients.includes(ingredient)
//       )) {
//         matchingRecipes.push(new Recipe(
//           id,
//           recipe.recipeName,
//           recipe.cuisine,
//           // ... other recipe properties
//         ));
//       }
//     }

//     if (matchingRecipes.length === 0) {
//       console.log('No matching recipes found.');
//     }

//     return matchingRecipes;
//   } catch (error) {
//     console.error(`Error fetching recipes: ${error.message}`);
//     throw new Error(`Error fetching recipes: ${error.message}`);
//   }
// };

exports.getRecipesByIngredients = async (ingredients) => {
  const recipes = [];

  // Custom function to normalize ingredients, get ingredients name after the word "of"
  const normalizeIngredient = (ingredient) => {
    const match = ingredient.toLowerCase().match(/\s*of\s+(.+)/);
    if (match) {
      return match[1].trim();
    } else {
      return ingredient.toLowerCase();
    }
  };

  try {
    const snapshot = await db.ref('recipes').once('value');
    const recipesData = snapshot.val();

    if (!recipesData) {
      throw new Error('No recipes found in the database');
    }

    for (const id in recipesData) {
      const recipe = recipesData[id];
      const recipeIngredients = recipe.ingredients || []; // Assuming ingredients are stored as an array in the recipe object

      let foundIngredients = [];

      for (const recipeIngredient of recipeIngredients) {
        const normalizedRecipeIngredient = normalizeIngredient(recipeIngredient);
        
        // Check if any ingredient in 'ingredients' partially matches 'normalizedRecipeIngredient'
        const matchingIngredients = ingredients.filter(ingredient => normalizedRecipeIngredient.includes(ingredient.toLowerCase())
        );

        if (matchingIngredients.length > 0) {
          foundIngredients = [...foundIngredients, ...matchingIngredients];
        }
      }

      if (foundIngredients.length > 0) {
        recipes.push(new Recipe(
          id,
          recipe.recipeName,
          recipe.cuisine,
          recipe.duration,
          recipe.servingSize,
          recipe.calories,
          recipe.image,
          recipe.ingredients,
          recipe.equipments,
          recipe.steps
        ));
      }
    }

    return recipes;
  } catch (error) {
    throw new Error(`Error fetching recipes: ${error.message}`);
  }
};



  










//for admins to include recipe into the database (not shown on website)
exports.addRecipe = async (newRecipe) => {
  const recipeRef = db.ref('recipes').push();
  await recipeRef.set(newRecipe);
  return new Recipe(recipeRef.key, recipeRef.recipeName, recipeRef.cuisine, recipeRef.duration, recipeRef.servingSize, recipeRef.calories, 
    recipeRef.images, recipeRef.ingredients, recipeRef.equipments, recipeRef.steps);
};