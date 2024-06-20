/*Contains the logic for handling requests and responses.*/

// controllers/userController.js

const userService = require('../services/userService');

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const newUser = await userService.registerUser(email, password, username);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.loginUserWithUsername = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUserWithUsername(username, password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// exports.loginWithGoogle = async (req, res) => {
//   try {
//     const user = await userService.loginWithGoogle();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add a new user
// exports.addUser = async (req, res) => {
//   try {
//     const newUser = req.body;
//     const user = await userService.addUser(newUser);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };