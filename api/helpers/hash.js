'use strict';

const bcrypt = require('bcryptjs');

const config = require('../config');

module.exports = {
   hashPassword: async data => {
      try {
         const salt = await bcrypt.genSalt(config.salt.length);

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
