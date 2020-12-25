const { Router } = require('express');

const ProductController = require('./product.controller');

const productRouter = Router();

productRouter.get('/', ProductController.getProducts);

module.exports = productRouter;
