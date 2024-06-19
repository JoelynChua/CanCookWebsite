const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/login-username', userController.loginUserWithUsername);
router.post('/login-google', userController.loginWithGoogle);

module.exports = router;