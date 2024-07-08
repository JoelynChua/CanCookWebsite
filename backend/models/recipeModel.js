class Recipe {
    constructor(
        id,
        recipeName,
        cuisine,
        duration,
        servingSize,
        calories,
        image,
        ingredients,
        equipments,
        steps
    ) {
        this.id = id;
        this.recipeName = recipeName;
        this.cuisine = cuisine;
        this.duration = duration;
        this.servingSize = servingSize;
        this.calories = calories;
        this.image = image;
        this.ingredients = ingredients;
        this.equipments = equipments;
        this.steps = steps;
    }
}

module.exports = Recipe;
