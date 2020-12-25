const { hash, RequestError } = require('../../../../helpers');
const { getHashPassword } = hash;

async function validPassword(pass, hashPass) {
   try {
      const { password } = hashPass;
      const isPasswordValid = await getHashPassword(pass, password);

      if (!isPasswordValid) {
         throw new RequestError('Password failed..', 401);
      }

      return isPasswordValid;
   } catch (error) {
      throw error;
   }
}

module.exports = validPassword;
