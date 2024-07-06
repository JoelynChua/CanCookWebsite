const express = require('express');
const userController = require('../controllers/userController');



const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);


router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipeDetails/:id', recipeController.getRecipeById);
router.post('/recipes', recipeController.addRecipe);


module.exports = router;