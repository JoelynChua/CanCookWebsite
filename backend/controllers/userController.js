/*Contains the logic for handling requests and responses.*/

// controllers/userController.js

const userService = require('../services/userService');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await userService.addUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};