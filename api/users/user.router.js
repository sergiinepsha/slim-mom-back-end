const { Router } = require('express');

const UserController = require('./user.controller');
const { authorize } = require('../auth/middleware');

userRouter = Router();

userRouter.get('/', authorize, UserController.getUser);

module.exports = userRouter;
