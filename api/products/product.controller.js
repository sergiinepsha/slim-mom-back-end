const Joi = require('joi');

const ProductService = require('./product.service');

module.exports = class ProductController {
   /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res
    * @param {import('express').NextFunction} next
    */
   static async getProducts(req, res, next) {
      try {
         const { search } = req.query;

         const products = await ProductService.getProducts(search);
         console.log(products);

         return res.status(200).json(products);
      } catch (error) {
         // TODO: error handler
         next();
      }
   }
};
