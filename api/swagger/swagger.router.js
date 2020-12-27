const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc'); ///

swaggerRouter = Router();

// Swagger set up
const options = {
   swaggerDefinition: {
      openapi: '3.0.3',
      info: {
         title: 'Slimmom API docs',
         version: '1.0.0',
         description: 'API documentation for Node.js#2_Kharkiv project Slimmom.',
         license: {
            name: 'MIT',
            url: 'https://choosealicense.com/licenses/mit/',
         },
         contact: {
            name: 'Backend-on-GitHub:',
            url: 'https://github.com/LeanNSP/slim-mom-back-end',
         },
      },
      servers: [
         {
            url: 'http://localhost:3100/api-docs',
         },
      ],
   },
   apis: [],
};
const specs = swaggerJsdoc(options);

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get(
   '/',
   swaggerUi.setup(specs, {
      explorer: true,
   }),
);

module.exports = swaggerRouter;
