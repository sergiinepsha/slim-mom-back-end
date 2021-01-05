'use strict';

exports.calculateDailyRate = require('./calculateDailyRate');
exports.checkEatenProduct = require('./checkEatenProduct');
exports.updateExistingDay = require('./updateExistingDay');
exports.createNewDay = require('./createNewDay');
exports.updateCurrentDay = require('./updateCurrentDay');
exports.updateDaySummary = require('./updateDaySummary');
exports.hash = require('./hash');
exports.userToken = require('./userToken');
exports.getUserIdFromToken = require('./getUserIdFromToken');
exports.checkedId = require('./checkedId');
//auth
exports.getEmail = require('./auth/getEmail');
exports.validPassword = require('./auth/validPassword');
exports.createNewUser = require('./auth/createNewUser');
exports.prepareUserResponse = require('./auth/prepareUserResponse');
//email
exports.sendVerificationToken = require('./email/sendVerificationToken');
exports.verifyEmailToken = require('./email/verifyEmailToken');
