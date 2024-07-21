const recipeService = require("../services/recipeService");

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


//search
// exports.searchRecipeByName = async (req, res) => {
//   try {
//     const { recipeName } = req.query; // Retrieve the recipeName from query parameters

//     // Assuming recipeService has a method to search for a recipeID by recipeName
//     const recipeID = await recipeService.getRecipeIdByName(recipeName);

//     if (!recipeID) {
//       return res.status(404).send("Recipe ID not found for the given recipe name");
//     }

//     const recipe = await recipeService.searchRecipeById(recipeID);

//     if (!recipe) {
//       return res.status(404).send("Recipe not found");
//     }

//     res.json(recipe);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

exports.addRecipe = async (req, res) => {
    try {
        const newRecipe = req.body;
        const recipe = await recipeService.addRecipe(newRecipe);
        res.json(recipe);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
