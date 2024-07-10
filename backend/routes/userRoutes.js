const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipeDetails/:id', recipeController.getRecipeById);
router.get('/filteredResults/cuisine/:cuisine', recipeController.getRecipesByCuisine);
router.post('/filteredResults/ingredients', recipeController.getRecipesByIngredients);
router.post('/filteredResults/calories', recipeController.getRecipesByCalories);
router.post('/filteredResults/caloriesIngredients', recipeController.getRecipesByCaloriesIngredients);
router.post('/recipes', recipeController.addRecipe);

module.exports = router;