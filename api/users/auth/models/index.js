//auth
exports.getEmail = require('./auth/getEmail');
exports.validPassword = require('./auth/validPassword');
exports.createNewUser = require('./auth//createNewUser');
//email
exports.sendVerificationToken = require('./email/sendVerificationToken');
exports.verifyEmailToken = require('./email/verifyEmailToken');
