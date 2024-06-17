const recipeService = require('../services/recipeService');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipe = await recipeService.getAllRecipes();
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const newRecipe = req.body;
    const recipe = await recipeService.addRecipe(newRecipe);
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err.message);
  }
};