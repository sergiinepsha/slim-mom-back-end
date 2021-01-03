'use strict';

const { Router } = require('express');

const ProductController = require('../controllers/product.controller');
const AuthController = require('../controllers/auth.controller');

const productRouter = Router();

productRouter.get('/', AuthController.authorize, ProductController.getProducts);

module.exports = productRouter;
