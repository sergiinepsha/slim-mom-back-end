const userModule = require('../../../user.model');
const { hash, RequestError } = require('../../../../helpers');
const { hashPassword } = hash;
// const { sendVerificationToken } = require('../../handlerEmail/models');

async function createNewUser(data) {
   try {
      const { email, password } = data;

      const validUser = await userModule.findUserByEmail(email);

      if (validUser) {
         throw new RequestError('User do not create', 409);
      }

      const hashPass = await hashPassword(password);

      const newUser = await userModule.create({
         ...data,
         password: hashPass,
      });

      // await sendVerificationToken(newUser);

      const returnUser = await {
         name: newUser._doc.name,
         email: newUser._doc.email,
      };

      return returnUser;
   } catch (error) {
      throw error;
   }
}
module.exports = createNewUser;
