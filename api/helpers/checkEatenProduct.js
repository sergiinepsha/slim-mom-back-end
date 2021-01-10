'use strict';

const productModel = require('../models/product.model');

module.exports = async productId => {
   try {
      const eatenProduct = await productModel.findById(productId);

      if (!eatenProduct) {
         const err = new Error('Product not found');
         err.code = 404;
         throw err;
      }

      return eatenProduct;
   } catch (error) {
      throw error;
   }
};
