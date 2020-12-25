const { authorize, validateIdQuery } = require('../../../middleware');

const AuthController = require('../controllers/AuthController');
// const EmailController = require('../controllers/EmailController');

const validateSingIn = require('../middleware/validateSingIn');
const validateCreateUser = require('../middleware/validateCreateUser');

//CRUD
const authList = [
   {
      app: 'post',
      urn: '/register',
      middleware: [validateCreateUser, AuthController.createUser],
   },

   {
      app: 'post',
      urn: '/login',
      middleware: [validateSingIn, AuthController.login],
   },
   {
      app: 'patch',
      urn: '/logout',
      middleware: [authorize, AuthController.logout],
   },
   {
      app: 'get',
      urn: '/current',
      middleware: [authorize, AuthController.getCurrentUser],
   },
   // {
   //    app: 'get',
   //    urn: 'verify/:verificationToken',
   //    middleware: [EmailController.verifyUser],
   // },
];

module.exports = authList;
