const { Router } = require('express');

const listRouters = require('./list.routers');

const apiRouter = Router();

const { RequestError } = require('../helpers');

listRouters.map(({ urn, router }) => {
   apiRouter.use(urn, router);
});

apiRouter.use((req, res, next) => {
   next(new RequestError('Not found page', 404));
});

module.exports = apiRouter;
