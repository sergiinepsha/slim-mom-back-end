const { Router } = require('express');

const { authorize } = require('../auth/middleware');
const DailyRateControllers = require('./dailyRate.controllers');
const DailyRateValidators = require('./dailyRate.validators');

const dailyRateRouters = Router();

dailyRateRouters.post(
   '/',
   DailyRateValidators.validateGetDailyRate,
   DailyRateControllers.getDailyRate,
);

dailyRateRouters.post(
   '/:userId',
   authorize,
   DailyRateValidators.validateGetDailyRate,
   DailyRateValidators.validateId,
   DailyRateControllers.getDailyRateUser,
);

module.exports = dailyRateRouters;
