// const {
// getEmail,
// validPassword,
// createNewUser,
// verifyEmailToken,
// prepareUserResponse,
// userToken,
// } = require('../helpers');

// const AuthService = require('../services/auth.services');

// const { updateUserToken, addForUserTokens } = userToken;

// module.exports = class AuthController {
//   static async createUser(req, res, next) {
//      try {
//         const user = await createNewUser(req.body);

//         return await res.status(201).json(user);
//      } catch (error) {
//         next(error);
//      }
//   }

//   static async login(req, res, next) {
//      try {
//         const { email, password } = req.body;

//         const userFromDb = await getEmail(email);
//         console.dir(userFromDb);
//         await validPassword(password, userFromDb);

//         const user = await addForUserTokens(userFromDb._id);

//         const userData = prepareUserResponse(user);

//         return res.status(201).json(userData);
//      } catch (error) {
//         next(error);
//      }
//   }

//   static async logout(req, res, next) {
//      try {
//         const user = req.user;

//         await updateUserToken(user.sid, null);

//         return res.status(204).end();
//      } catch (error) {
//         next(error);
//      }
//   }

//   static async authorize(req, res, next) {
//      try {
//         const authorizationHeader = req.get('Authorization' || '');

//         req.user = await AuthService.authorize(authorizationHeader);

//         next();
//      } catch (err) {
//         next(err);
//      }
//   }

//   static async verifyUserByEmail(req, res, next) {
//      try {
//         const { verificationToken } = req.params;

//         await verifyEmailToken(verificationToken);

//         return res.status(200).json();
//      } catch (error) {
//         next(error);
//      }
//   }

//};

//mocha test/controllers/auth.controller.test.js
const sinon = require('sinon');
const should = require('should');

const AuthController = require('../../api/controllers/auth.controller');

const helpers = require('../../api/helpers');

// const {
//    getEmail,
//    validPassword,
//    createNewUser,
//    verifyEmailToken,
//    prepareUserResponse,
//    userToken,
// } = require('../../api/helpers');

// AuthController.createUser(
//    {
//       body: [data],
//    },
//    null,
//    nextFn,
// )
describe('Test auth.controller class', () => {
   let nextFn;
   let returnResult;
   let returnError;
   let sandbox;
   let creatUserStub;

   beforeEach(() => {
      nextFn = sinon.spy();
      sandbox = sinon.createSandbox();
   });
   afterEach(() => {
      sandbox.restore();
   });
   describe('Static func createUser', () => {
      describe('true', () => {});
   });
   describe('Static func login', () => {
      describe('true', () => {});
      describe('error', () => {});
   });
   describe('Static func logout', () => {
      beforeEach(() => {
         try {
            const auth = new AuthController();
         } catch (error) {}
      });
      afterEach(() => {
         sandbox.restore();
      });
      describe('true', () => {});
      describe('error', () => {});
   });
   describe('Validation func authorize', () => {
      beforeEach(() => {
         try {
         } catch (error) {}
      });
      afterEach(() => {
         sandbox.restore();
      });
      describe('true', () => {});
      describe('error', () => {});
   });
   describe('Validation func verifyUserByEmail', () => {
      beforeEach(() => {
         try {
            const auth = new AuthController();
         } catch (error) {}
      });
      afterEach(() => {
         sandbox.restore();
      });
      describe('true', () => {});
      describe('error', () => {});
   });
});
