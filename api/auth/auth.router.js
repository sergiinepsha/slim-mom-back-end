const { Router } = require('express');
const authRouter = Router();

const AuthController = require('./auth.controller');
const { authorize, validateSingIn, validateCreateUser } = require('./middleware');

authRouter.post('/login', validateSingIn, AuthController.login);

authRouter.post('/register', validateCreateUser, AuthController.createUser);

authRouter.post('/logout', authorize, AuthController.logout);

authRouter.get('/verify/:verificationToken', AuthController.verifyUserByEmail);

module.exports = authRouter;
