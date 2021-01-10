'use strict';

const ProductService = require('../services/product.service');

module.exports = class ProductController {
   static async getProducts(req, res, next) {
      try {
         const { search } = req.query;

         const products = await ProductService.getProducts(search);

         return res.status(200).json(products);
      } catch (error) {
         next(error);
      }
   }
};
