const { Router } = require('express');
const dailyRateControllers = require('./dailyRate.controllers');
const dailyRateRouters = Router();

dailyRateRouters.post(
   '/',
   //   dailyRateControllers.validateContact,
   dailyRateControllers.dailyRate,
);

dailyRateRouters.post(
   '/:userId',
   //   dailyRateControllers.validateId,
   dailyRateControllers.dailyRate,
);

module.exports = dailyRateRouters;
