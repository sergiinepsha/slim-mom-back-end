'use strict';

const { Router } = require('express');

const AuthController = require('../controllers/auth.controller');
const AuthValidators = require('../validators/auth.validators');

const authRouter = Router();

authRouter.post('/login', AuthValidators.validateSingIn, AuthController.login);

authRouter.post('/register', AuthValidators.validateCreateUser, AuthController.createUser);

authRouter.post('/logout', AuthController.authorize, AuthController.logout);

// authRouter.get('/verify/:verificationToken', AuthController.verifyUserByEmail);

module.exports = authRouter;
