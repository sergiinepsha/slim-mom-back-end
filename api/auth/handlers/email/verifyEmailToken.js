const userModule = require('../../../users/user.model');
const { RequestError } = require('../../../helpers');

async function verifyEmailToken(token) {
   try {
      const userToken = await userModule.fineByVerificationToken(token);

      if (!userToken) {
         throw new RequestError('User not found', 404);
      }

      await userModule.verifyUser(userToken._id);
   } catch (error) {
      throw error;
   }
}

module.exports = verifyEmailToken;
