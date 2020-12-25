const productModel = require('./product.model');

module.exports = class ProductService {
   /**
    * @param {string} search
    *
    * @returns {Promise<{[products]}>}
    */
   static async getProducts(search) {
      try {
         const products = await productModel.find();

         const result = products.filter(({ title }) =>
            title.ru.toLowerCase().includes(search.toLowerCase()),
         );

         return result;
      } catch (error) {
         throw error;
      }
   }
};
