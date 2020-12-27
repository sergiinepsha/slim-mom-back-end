const userModule = require('../../../users/user.model');
const { RequestError } = require('../../../helpers');

async function getEmail(email) {
   try {
      const user = await userModule.findUserByEmail(email);

      if (!user) {
         throw new RequestError('Email or password is wrong', 401);
      }
      return user;
   } catch (error) {
      throw error;
   }
}

module.exports = getEmail;
