'use strict';

const { Router } = require('express');

const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const userRouter = Router();

userRouter.get('/', AuthController.authorize, UserController.getUser);

module.exports = userRouter;
