'use strict';

const productModel = require('../models/product.model');

module.exports = class ProductService {
   static async getProducts(search) {
      try {
         const products = await productModel.find({
            'title.ru': { $regex: `^${search}`, $options: '$i' },
         });

         return products;
      } catch (error) {
         throw error;
      }
   }
};
