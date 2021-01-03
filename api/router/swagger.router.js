'use strict';

const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../../swagger.json');

const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

module.exports = swaggerRouter;
