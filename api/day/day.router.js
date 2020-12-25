const { Router } = require('express');

const DayController = require('./day.controller');

const dayRouter = Router();

dayRouter.post('/', DayController.validateAddProduct, DayController.addProductPerDay);

dayRouter.delete('/', DayController.deleteProductPerDay);

dayRouter.post('/info', DayController.infoPerDay);

module.exports = dayRouter;
