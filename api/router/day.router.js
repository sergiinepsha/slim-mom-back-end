'use strict';

const { Router } = require('express');

const AuthController = require('../controllers/auth.controller');
const DayController = require('../controllers/day.controller');
const DayValidator = require('../validators/day.validators');

const dayRouter = Router();

dayRouter.post(
   '/',
   AuthController.authorize,
   DayValidator.validateAddProduct,
   DayValidator.validateProductId,
   DayController.addProductPerDay,
);

dayRouter.delete(
   '/',
   AuthController.authorize,
   DayValidator.validateDeleteProduct,
   DayValidator.validateAllIds,
   DayController.deleteProductPerDay,
);

dayRouter.post(
   '/info',
   AuthController.authorize,
   DayValidator.validateInfoDay,
   DayController.infoPerDay,
);

module.exports = dayRouter;
