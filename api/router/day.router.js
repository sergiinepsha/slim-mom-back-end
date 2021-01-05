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
   DayValidator.validateId,
   DayController.addProductPerDay,
);

dayRouter.delete('/', AuthController.authorize, DayController.deleteProductPerDay);

dayRouter.post('/info', AuthController.authorize, DayController.infoPerDay);

module.exports = dayRouter;
