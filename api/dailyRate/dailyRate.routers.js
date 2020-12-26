const { Router } = require('express');
const authorize = require('../auth/middleware/authorize');
const dailyRateControllers = require('./dailyRate.controllers');
const dailyRateRouters = Router();

dailyRateRouters.post('/', dailyRateControllers.validateDailyRate, dailyRateControllers.dailyRate);

dailyRateRouters.post(
   '/:userId',
   authorize,
   dailyRateControllers.validateDailyRate,
   dailyRateControllers.dailyRate,
);

module.exports = dailyRateRouters;
