const userModel = require('../../../users/user.model');
const { RequestError } = require('../../../helpers');

module.exports = getEmail = async email => {
   try {
      const user = await userModel.findUserByEmail(email);

      if (!user) {
         throw new RequestError('Email or password is wrong', 401);
      }
      return user;
   } catch (error) {
      throw error;
   }
};
