const userModel = require('../../../users/user.model');
const { RequestError } = require('../../../helpers');

module.exports = verifyEmailToken = async token => {
   try {
      const userToken = await userModel.fineByVerificationToken(token);

      if (!userToken) {
         throw new RequestError('User not found', 404);
      }

      await userModel.verifyUser(userToken._id);
   } catch (error) {
      throw error;
   }
};
