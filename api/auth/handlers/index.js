//auth
exports.getEmail = require('./auth/getEmail');
exports.validPassword = require('./auth/validPassword');
exports.createNewUser = require('./auth/createNewUser');
exports.prepareUserResponse = require('./auth/prepareUserResponse');
exports.authStatic = require('./auth/authStatic');
//email
exports.sendVerificationToken = require('./email/sendVerificationToken');
exports.verifyEmailToken = require('./email/verifyEmailToken');
exports.emailStatic = require('./email/emailStatic');
