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

// Filter
exports.getRecipesByCuisine = async (req, res) => {
    try {
        const { cuisine } = req.params;
        const recipes = await recipeService.getRecipesByCuisine(cuisine);
        if (!recipes || recipes.length === 0) {
            return res
                .status(404)
                .send("No recipes found for the specified cuisine");
        }
        res.json(recipes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getRecipesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;
        console.log({ ingredients });
        if (
            !ingredients ||
            !Array.isArray(ingredients) ||
            ingredients.length === 0
        ) {
            return res.status(400).send("Invalid or empty ingredients list");
        }

        const recipes = await recipeService.getRecipesByIngredients(
            ingredients
        );
        if (!recipes || recipes.length === 0) {
            return res
                .status(404)
                .send("No recipes found for the specified ingredients");
        }
        res.json(recipes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getRecipesByCalories = async (req, res) => {
    try {
        const { minCalories, maxCalories } = req.body;
        console.log({ minCalories, maxCalories });

        if (
            !minCalories ||
            !maxCalories ||
            isNaN(minCalories) ||
            isNaN(maxCalories)
        ) {
            return res.status(400).send("Invalid minCalories or maxCalories");
        }

        const recipes = await recipeService.getRecipesByCalories(
            minCalories,
            maxCalories
        );

        if (!recipes || recipes.length === 0) {
            return res
                .status(404)
                .send("No recipes found within the specified calorie range");
        }

        res.json(recipes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getRecipesByCaloriesIngredients = async (req, res) => {
    try {
        const { ingredients, minCalories, maxCalories } = req.body;
        console.log({ ingredients, minCalories, maxCalories });

        if (
            !ingredients ||
            !Array.isArray(ingredients) ||
            ingredients.length === 0
        ) {
            return res.status(400).send("Invalid or empty ingredients list");
        }

        if (
            (minCalories && isNaN(minCalories)) ||
            (maxCalories && isNaN(maxCalories))
        ) {
            return res.status(400).send("Invalid calorie range");
        }

        const recipes = await recipeService.getRecipesByIngredients(
            ingredients
        );

        if (!recipes || recipes.length === 0) {
            return res
                .status(404)
                .send("No recipes found for the specified ingredients");
        }

        const filteredRecipes = recipes.filter((recipe) => {
            const calories = recipe.calories;
            return calories >= minCalories && calories <= maxCalories;
        });

        if (filteredRecipes.length === 0) {
            return res
                .status(404)
                .send("No recipes found within the specified calorie range");
        }

        res.json(filteredRecipes);
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
