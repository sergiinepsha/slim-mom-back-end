const { Router } = require('express');
const authorize = require('../auth/middleware/authorize');

const DayController = require('./day.controller');
const DayValidator = require('./day.validators');

const dayRouter = Router();

dayRouter.post('/', authorize, DayValidator.validateAddProduct, DayController.addProductPerDay);

dayRouter.delete('/', authorize, DayController.deleteProductPerDay);

dayRouter.post('/info', authorize, DayController.infoPerDay);

module.exports = dayRouter;
