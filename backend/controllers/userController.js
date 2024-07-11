// const userService = require('../services/userService');

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// exports.addUser = async (req, res) => {
//   try {
//     const newUser = req.body;
//     const user = await userService.addUser(newUser);
//     res.json(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };