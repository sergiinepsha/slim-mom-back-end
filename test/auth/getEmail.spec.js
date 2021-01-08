//mocha test/auth/getEmail.test.js
const sinon = require('sinon');
const mongoose = require('mongoose');
const should = require('should');

const { getEmail } = require('../../api/helpers');

const connectionOnDB = require('../../api/connectionOnDB');

const userModel = require('../../api/models/user.model');

describe('Function helpers/getEmail()', () => {
   let sandbox;
   let testEmail;
   let testEmailStub;
   let testError;

   describe('The unit when not email throw error', () => {
      before(async () => {
         sandbox = sinon.createSandbox();

         testEmailStub = sandbox.stub(userModel, 'findUserByEmail');

         testEmailStub.returns(false);

         try {
            testEmail = await getEmail('s');
         } catch (error) {
            testError = error;
         }
      });

      after(() => {
         sandbox.restore();
      });

      it('It throw error status 401', () => {
         testError.should.be.containDeep({
            code: 401,
         });
      });
      it('It throw error message true', () => {
         testError.should.be.containDeep({
            message: 'Email or password is wrong',
         });
      });
   });
   describe('The Unit test for  getEmail func when email is found', () => {
      const data = {
         accessToken: 'accessToken',
         refreshToken: 'refreshToken',
         sid: 'sid',
         todaySummary: {},
         user: {
            email: 'test@test.com',
            name: 'name',
            userData: 'userData',
            password: 'password',
            _id: '_id',
         },
         days: {},
      };
      beforeEach(async () => {
         sandbox = sinon.createSandbox();

         testEmailStub = sandbox.stub(userModel, 'findUserByEmail');

         testEmailStub.resolves(data);

         try {
            testEmail = await getEmail(data.user.email);
         } catch (error) {
            testError = error;
         }
      });

      afterEach(() => {
         sandbox.restore();
      });

      it('status OK ', async () => {
         testEmail.should.be.ok();
      });
      it('Found line of email and as a string  ', async () => {
         testEmail.should.be.containDeep({ user: { email: data.user.email } });
         testEmail.user.should.be.have.property('email').which.is.a.String();
      });
      it('Found line of name and as a string', async () => {
         testEmail.should.be.containDeep({ user: { name: data.user.name } });
         testEmail.user.should.be.have.property('name').which.is.a.String();
      });
      it('Found line of password  and as a string', async () => {
         testEmail.should.be.containDeep({ user: { password: data.user.password } });
         testEmail.user.should.be.have.property('password').which.is.a.String();
      });
      it('Found line of accessToken  and as a string', async () => {
         testEmail.should.be.containDeep({ accessToken: data.accessToken });
         testEmail.should.be.have.property('accessToken').which.is.a.String();
      });
      it('Found line of refreshToken  and as a string', async () => {
         testEmail.should.be.containDeep({ refreshToken: data.refreshToken });
         testEmail.should.be.have.property('refreshToken').which.is.a.String();
      });
      it('Found line of sid and as a string', async () => {
         testEmail.should.be.containDeep({ sid: data.sid });
         testEmail.should.be.have.property('sid').which.is.a.String();
      });
      it('Found line of todaySummary  and as an array', async () => {
         testEmail.should.be.containDeep({ todaySummary: data.todaySummary });
         testEmail.should.be.have.property('todaySummary').which.is.a.Object();
      });
      it('Found line of user  and as an array', async () => {
         testEmail.should.be.containDeep({ user: data.user });
         testEmail.should.be.have.property('user').which.is.a.Object();
      });
      it('Found line of days  and as an array', async () => {
         testEmail.should.be.containDeep({ days: data.days });
         testEmail.should.be.have.property('days').which.is.a.Object();
      });
   });

   describe('When no email  to database and some error', () => {
      before(async () => {
         await connectionOnDB();

         try {
            await getEmail('s');
         } catch (error) {
            testError = error;
         }
      });
      after(() => {
         mongoose.disconnect();
      });

      it('It throw error status 401', () => {
         testError.should.be.containDeep({
            code: 401,
         });
      });
      it('It throw error message true', () => {
         testError.should.be.containDeep({
            message: 'Email or password is wrong',
         });
      });
   });

   // иногда нет соединения с базой и тест валиться
   // describe('Get user by email from database', () => {
   //    let emailTest = 'bip@bip.com';

   //    before(async () => {
   //       await connectionOnDB();

   //       testEmail = await getEmail(emailTest);
   //    });
   //    after(() => {
   //       mongoose.disconnect();
   //    });

   //    it('status OK ', () => {
   //       testEmail.should.be.ok();
   //    });
   //    it('Found line of email and as a string  ', () => {
   //       testEmail.should.be.containDeep({ email: 'bip@bip.com' });
   //       testEmail.should.be.have.property('email').which.is.a.String();
   //    });
   //    it('Found line of name and as a string', () => {
   //       testEmail.should.be.containDeep({ name: 'Myk' });
   //       testEmail.should.be.have.property('name').which.is.a.String();
   //    });
   //    it('Found line of password  and as a string', () => {
   //       testEmail.should.be.have.property('password').which.is.a.String();
   //    });
   //    it('Found line of tokens  and as a string', () => {
   //       testEmail.should.be.have.property('accessToken').which.is.a.String();
   //       testEmail.should.be.have.property('refreshToken').which.is.a.String();
   //    });
   //    it('Found line of sid and as a string', () => {
   //       testEmail.should.be.have.property('sid').which.is.a.String();
   //    });
   //    it('Found line of days  and as an array', () => {
   //       testEmail.should.be.have.property('days').which.is.a.Object();
   //    });
   // });
});
