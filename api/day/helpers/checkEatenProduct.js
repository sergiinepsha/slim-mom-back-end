const productModel = require('../../products/product.model');

module.exports = checkEatenProduct = async productId => {
   try {
      const eatenProduct = await productModel.findById(productId);

      if (!eatenProduct) {
         throw new Error('Product not found').code(404);
      }

      return eatenProduct;
   } catch (error) {
      throw error;
   }
};
