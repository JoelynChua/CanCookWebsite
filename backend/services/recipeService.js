const db = require('../config/firebase');
const Recipe = require('../models/recipeModel');

exports.getAllRecipes = async () => {
  const snapshot = await db.ref('recipes').once('value');
  const recipe = snapshot.val();
  return Object.keys(recipe).map(key => new Recipe(key, recipe[key].recipeName, recipe[key].cuisine, recipe[key].duration, 
    recipe[key].servingSize, recipe[key].calories, recipe[key].ingredients, recipe[key].equipments, recipe[key].steps));
};


//for admins to include recipe into the database (not shown on website)
exports.addRecipe = async (newRecipe) => {
  const recipeRef = db.ref('recipes').push();
  await recipeRef.set(newRecipe);
  return new Recipe(recipeRef.key, recipeRef.recipeName, recipeRef.cuisine, recipeRef.duration, recipeRef.servingSize, recipeRef.calories, 
    recipeRef.ingredients, recipeRef.equipments, recipeRef.steps);
};