const productModel = require('./product.model');

module.exports = class ProductService {
   /**
    * @param {string} search
    *
    * @returns {Promise<{[products]}>}
    */
   static async getProducts(search) {
      try {
         console.log('search >>>', search);
         return await productModel.find({ title: { ru: search } });
      } catch (error) {
         throw error;
      }
   }
};
