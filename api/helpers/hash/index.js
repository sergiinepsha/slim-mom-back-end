const bcrypt = require('bcryptjs');
require('dotenv').config();

const { SALT } = process.env;

async function hashPassword(data) {
   try {
      const salt = await bcrypt.genSalt(SALT.length);
      return await bcrypt.hash(data, salt);
   } catch (error) {
      throw error;
   }
}

async function getHashPassword(pass, hashPass) {
   try {
      const valid = await bcrypt.compare(pass, hashPass);
      return valid;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   hashPassword,
   getHashPassword,
};
