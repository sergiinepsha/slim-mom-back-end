const { Router } = require('express');
const authRouter = Router();

const AuthController = require('./auth.controller');
const { authorize, validateSingIn, validateCreateUser } = require('./middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/Auth.js'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/Auth.js'
 */
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
