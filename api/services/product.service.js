'use strict';

const productModel = require('../models/product.model');

module.exports = class ProductService {
   static async getProducts(search) {
      try {
         const products = await productModel.find();

         return products.filter(({ title }) =>
            title.ru.toLowerCase().includes(search.toLowerCase()),
         );
      } catch (error) {
         throw error;
      }
   }
};
