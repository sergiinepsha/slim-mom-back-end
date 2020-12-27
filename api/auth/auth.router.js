const { Router } = require('express');
const authRouter = Router();

const AuthController = require('./auth.controller');
const { authorize, validateSingIn, validateCreateUser } = require('./middleware');

authRouter.post('/login', validateSingIn, AuthController.login);
authRouter.post('/register', validateCreateUser, AuthController.createUser);
authRouter.get('/current', authorize, AuthController.getCurrentUser);
authRouter.patch('/logout', authorize, AuthController.logout);

// authRouter.get('/verify/:verificationToken', AuthController.verifyUserByEmail);

//return Error
authRouter.use((err, req, res, next) => {
   console.log('\x1b[36m%s\x1b[0m', `Error >>> ${err.message}`);
   return res.status(err.status).send({ message: err.message });
});

module.exports = authRouter;
