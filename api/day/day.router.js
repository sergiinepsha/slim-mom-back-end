const { Router } = require('express');

const DayController = require('./day.controller');

const dayRouter = Router();

dayRouter.post('/info', DayController);

dayRouter.post('/', DayController);

dayRouter.delete('/', DayController);

module.exports = dayRouter;
