const userModel = require('../../../users/user.model');
const { hash } = require('../../helpers');
const { hashPassword } = hash;
// const { sendVerificationToken } = require('../../handlerEmail/models');

module.exports = createNewUser = async data => {
   try {
      const { email, password } = data;

      const validUser = await userModel.findUserByEmail(email);

      if (validUser) {
         throw new Error(
            'You could not register or a user with such an email exists or something went wrong',
         ).code(409);
      }

      const hashPass = await hashPassword(password);

      const newUser = await userModel.create({
         ...data,
         password: hashPass,
      });

      // await sendVerificationToken(newUser);

      const returnUser = {
         name: newUser._doc.name,
         email: newUser._doc.email,
      };

      return returnUser;
   } catch (error) {
      throw error;
   }
};
