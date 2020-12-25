const { Router } = require('express');
const dailyRateControllers = require('./dailyRate.controllers');
const dailyRateRouters = Router();

dailyRateRouters.post('/', dailyRateControllers.validateDailyRate, dailyRateControllers.dailyRate);

dailyRateRouters.post(
   '/:userId',
   //    dailyRateControllers.validateId,
   dailyRateControllers.validateDailyRate,
   dailyRateControllers.dailyRate,
);

module.exports = dailyRateRouters;
