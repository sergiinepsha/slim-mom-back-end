'use strict';

const { Router } = require('express');

const AuthController = require('../controllers/auth.controller');
const DailyRateControllers = require('../controllers/dailyRate.controllers');
const DailyRateValidators = require('../validators/dailyRate.validators');

const dailyRateRouters = Router();

dailyRateRouters.post(
   '/',
   DailyRateValidators.validateGetDailyRate,
   DailyRateControllers.getDailyRate,
);

dailyRateRouters.post(
   '/:userId',
   AuthController.authorize,
   DailyRateValidators.validateGetDailyRate,
   DailyRateValidators.validateId,
   DailyRateControllers.getDailyRateUser,
);

module.exports = dailyRateRouters;
