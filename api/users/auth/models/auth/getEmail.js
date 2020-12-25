const userModule = require('../../../userSchema');
const { RequestError } = require('../../../../helpers');

async function getEmail(email) {
   try {
      const contact = await userModule.findUserByEmail(email);
      if (!contact) {
         throw new RequestError('Email in use', 409);
      }
      return contact;
   } catch (error) {
      throw error;
   }
}

module.exports = getEmail;
