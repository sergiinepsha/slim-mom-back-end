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

         return products.filter(({ title }) =>
            title.ru.toLowerCase().includes(search.toLowerCase()),
         );
      } catch (error) {
         throw error;
      }
   }
};
