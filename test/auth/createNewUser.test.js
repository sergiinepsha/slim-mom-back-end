const sinon = require('sinon');
const should = require('should');
const mongoose = require('mongoose');

const { createNewUser } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');
const userModel = require('../../api/models/user.model');

// module.exports = async data => {
//    try {
//       const { email, password } = data;

//       const validUser = await userModel.findUserByEmail(email);

//       if (validUser) {
//          const err = new Error(
//             'You could not register or a user with such an email exists or something went wrong',
//          );
//          err.code = 409;
//          throw err;
//       }

//       const hashPass = await hashPassword(password);

//       const newUser = await userModel.create({
//          ...data,
//          password: hashPass,
//       });

//       const returnUser = {
//          name: newUser._doc.name,
//          email: newUser._doc.email,
//       };

//       return returnUser;
//    } catch (error) {
//       throw error;
//    }
// };

describe('Function  helpers/createNewUser()', () => {
   let data = { email: 'test@test.com', password: 'password' };
   let sandbox;
   let findUserByEmailStub;
   let actualResult;

   before(async () => {
      sandbox = sinon.createSandbox();
      findUserByEmailStub = sandbox.replace(userModel, 'findUserByEmail', () => true);
      try {
         await createNewUser(data);
      } catch (error) {
         actualResult = error;
      }
   });

   beforeEach(async () => {});

   afterEach(() => {
      sandbox.restore();
   });

   after(() => {
      sandbox.restore();
      // mongoose.disconnect();
   });

   describe('User creation was successful', () => {
      it('Should call findUserByEmail ', () => {
         // sinon.assert.calledOnce(findUserByEmailStub);
         // sinon.assert.calledWithExactly(findUserByEmailStub, data.email);
      });
   });

   describe('User creation was Error', () => {
      it('Throw error.code 409', () => {
         // (actualResult instanceof Error).should.be.true();
         actualResult.should.be.throw({
            code: 409,
         });
      });

      it('Throw error.message true', () => {
         actualResult.should.be.throw({
            message:
               'You could not register or a user with such an email exists or something went wrong',
         });
      });
   });
});
