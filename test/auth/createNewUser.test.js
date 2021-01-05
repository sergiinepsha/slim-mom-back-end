//mocha test/auth/createNewUser.test.js

const sinon = require('sinon');
const should = require('should');
const mongoose = require('mongoose');

const { createNewUser } = require('../../api/helpers');
const { hash } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');
const userModel = require('../../api/models/user.model');
const { expectation } = require('sinon');
const { hashPassword } = require('../../api/helpers/hash');

// module.exports = async data => {
//    try {
//       const { email, password } = data;

//       const validUser = await userModel.findUserByEmail(email);

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
   let data = { email: 'test@test.com', password: 'password', name: 'test' };

   let sandbox;
   let findUserByEmailStub;
   let createStub;
   let hashPasswordStub;
   let errorNewUser;
   let actualResult;

   beforeEach(async () => {});

   afterEach(() => {});

   describe('User was found at database', () => {
      beforeEach(async () => {
         sandbox = sinon.createSandbox();
         findUserByEmailStub = sandbox.stub(userModel, 'findUserByEmail');
         findUserByEmailStub.resolves([true]);

         try {
            await createNewUser(data);
         } catch (error) {
            errorNewUser = error;
         }
      });

      afterEach(() => {
         sandbox.restore();
      });

      it('The findUserByEmail function  was called once and accepted email ', () => {
         sinon.assert.calledOnce(findUserByEmailStub);
         sinon.assert.calledWithExactly(findUserByEmailStub, data.email);
      });

      it('Throw error.code 409', () => {
         errorNewUser.code.should.be.equal(409);
      });

      it('Throw error.message true', () => {
         errorNewUser.message.should.be.equal(
            'You could not register or a user with such an email exists or something went wrong',
         );
      });
   });

   describe('User was not found at database', () => {
      beforeEach(async () => {
         sandbox = sinon.createSandbox();

         findUserByEmailStub = sandbox.stub(userModel, 'findUserByEmail');
         createStub = sandbox.stub(userModel, 'create');

         findUserByEmailStub.resolves(false);

         createStub.resolves([
            {
               _doc: {
                  name: data.name,
                  email: data.email,
               },
            },
         ]);

         try {
            await createNewUser(data);
         } catch (error) {
            errorNewUser = error;
         }
      });

      afterEach(() => {
         sandbox.restore();
      });

      it('The findUserByEmail function  was called once ', () => {
         sinon.assert.calledOnce(findUserByEmailStub);
      });

      it('The findUserByEmail function  accepted email', () => {
         sinon.assert.calledWithExactly(findUserByEmailStub, data.email);
      });

      it('The creat function was called once ', () => {
         sinon.assert.calledOnce(createStub);
      });
      it('The creat function accepted password', () => {
         sinon.assert.calledWithExactly(createStub, { ...data, password: data.password });
      });
   });
});
