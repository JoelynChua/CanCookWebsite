const express = require('express'); // Import Express
const cors = require('cors'); // Import CORS if used

const userController = require('../controllers/userController');
const wishlistController = require('../controllers/wishlistController');
const recipeController = require('../controllers/recipeController');
const reviewController = require('../controllers/reviewsController');




const app = express();
const router = express.Router();
app.use(cors());

router.get("/users", userController.getUsers);
router.post("/users", userController.addUser);

router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipeDetails/:id", recipeController.getRecipeById);
router.get(
    "/filteredResults/cuisine/:cuisine",
    recipeController.getRecipesByCuisine
);
router.post(
    "/filteredResults/ingredients",
    recipeController.getRecipesByIngredients
);
router.post("/filteredResults/calories", recipeController.getRecipesByCalories);
router.post(
    "/filteredResults/caloriesIngredients",
    recipeController.getRecipesByCaloriesIngredients
);
router.post("/recipes", recipeController.addRecipe);

router.get('/wishlists', wishlistController.getAllWishlists);
router.get('/wishlists/user/:userID', wishlistController.getWishlistByUserID);
router.post('/wishlists', wishlistController.addWishlist);
router.delete('/wishlists/:id', wishlistController.deleteWishlist);


//router.get('/reviews', reviewController.getAllReviews);
//router.get('/reviews/:recipeID', reviewController.getReviewsByRecipeID);
router.get('/recipeDetails/:recipeID/reviews', reviewController.getReviewsByRecipeID);
router.post('/reviews', reviewController.postReview);
router.put('/reviews/:reviewID', reviewController.editReview);

// router.get('/wishlists', wishlistController.getAllWishlists);
// router.get('/wishlists/:id', wishlistController.getWishlistByID);
// router.post('/wishlists', wishlistController.addWishlist);
// router.delete('/wishlists/:id', wishlistController.deleteWishlist);


router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipeDetails/:id', recipeController.getRecipeById);
router.get('/filteredResults/cuisine/:cuisine', recipeController.getRecipesByCuisine);
router.post('/filteredResults/ingredients', recipeController.getRecipesByIngredients);
router.post('/filteredResults/calories', recipeController.getRecipesByCalories);
router.post('/filteredResults/caloriesIngredients', recipeController.getRecipesByCaloriesIngredients);
router.post('/recipes', recipeController.addRecipe);

module.exports = router;

