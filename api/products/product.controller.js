const ProductService = require('./product.service');
const { RequestError } = require('../helpers');

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
         next(new RequestError('Invalid query name', 404));
      }
   }
};
