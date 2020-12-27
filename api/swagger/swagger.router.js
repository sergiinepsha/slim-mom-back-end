const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

swaggerRouter = Router();

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

module.exports = swaggerRouter;
