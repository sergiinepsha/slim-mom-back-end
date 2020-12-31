const userModel = require('../../../users/user.model');

module.exports = getEmail = async email => {
   try {
      const user = await userModel.findUserByEmail(email);

      if (!user) {
         throw new Error('Email or password is wrong').code(401);
      }

      return user;
   } catch (error) {
      throw error;
   }
};
