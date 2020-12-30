const bcrypt = require('bcryptjs');
require('dotenv').config();

const { SALT } = process.env;

module.exports = {
   hashPassword: async data => {
      try {
         const salt = await bcrypt.genSalt(SALT.length);

         return await bcrypt.hash(data, salt);
      } catch (error) {
         throw error;
      }
   },

   getHashPassword: async (pass, hashPass) => {
      try {
         const valid = await bcrypt.compare(pass, hashPass);

         return valid;
      } catch (error) {
         throw error;
      }
   },
};
