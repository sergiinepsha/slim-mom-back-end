const productModel = require('../../products/product.model');
const RequestError = require('../../helpers/errors/RequestError');

module.exports = async function checkEatenProduct(productId) {
   try {
      const eatenProduct = await productModel.findById(productId);

      if (!eatenProduct) {
         throw new RequestError('Product not found', 404);
      }
      return eatenProduct;
   } catch (error) {
      throw error;
   }
};
