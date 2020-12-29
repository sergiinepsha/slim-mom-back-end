const { Router } = require('express');

const ProductController = require('./product.controller');
const { authorize } = require('../auth/middleware');

const productRouter = Router();

productRouter.get('/', authorize, ProductController.getProducts);

module.exports = productRouter;
