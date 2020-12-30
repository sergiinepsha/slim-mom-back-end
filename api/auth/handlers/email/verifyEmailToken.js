const userModel = require('../../../users/user.model');

module.exports = verifyEmailToken = async token => {
   try {
      const userToken = await userModel.fineByVerificationToken(token);

      if (!userToken) {
         throw new Error('User not found').code(404);
      }

      await userModel.verifyUser(userToken._id);
   } catch (error) {
      throw error;
   }
};
