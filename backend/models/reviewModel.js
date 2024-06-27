class Review {
    constructor(id, user, username, recipe, rating, comments, createdAt, editedAt) {
      this.id = id;
      this.user = user; // This should be the user ID
      this.username = username; // username
      this.recipe = recipe; // This should be the recipe ID
      this.rating = rating; // This should be a number between 1 and 5
      this.comments = comments; // This should be the text review
      this.createdAt = createdAt || new Date().toISOString(); // This should be the creation timestamp
      this.editedAt = editedAt || new Date().toISOString(); // This should be the edited timestamp
    }
  }
  
  module.exports = Review;
  