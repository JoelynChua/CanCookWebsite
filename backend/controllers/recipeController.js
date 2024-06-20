const recipeService = require('../services/recipeService');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipe = await recipeService.getAllRecipes();
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
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