//mocha api/auth/handlers/auth/getEmail.test.js
const sinon = require('sinon');
const mongoose = require('mongoose');
const should = require('should');

const { getEmail } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');

describe('Function helpers/getEmail()', () => {
   let emailTest = 'bip@bip.com';
   let testEmail;

   before(async () => {
      await connectionOnDB();
      testEmail = await getEmail(emailTest);
   });
   after(() => {
      mongoose.disconnect();
   });

   describe('When no email and some error', () => {
      it('It throw error status 401', async () => {
         return await await getEmail('s').should.be.rejectedWith(Error, {
            code: 401,
         });
      });
      it('It throw error message true', async () => {
         return await await getEmail('s').should.be.rejectedWith(Error, {
            message: 'Email or password is wrong',
         });
      });
   });

   describe('Get user by email from database', () => {
      it('status OK ', async () => {
         testEmail.should.be.ok();
      });
      it('Found line of email and as a string  ', async () => {
         testEmail.should.be.containDeep({ email: 'bip@bip.com' });
         testEmail.should.be.have.property('email').which.is.a.String();
      });
      it('Found line of name and as a string', async () => {
         testEmail.should.be.containDeep({ name: 'Myk' });
         testEmail.should.be.have.property('name').which.is.a.String();
      });
      it('Found line of password  and as a string', async () => {
         testEmail.should.be.have.property('password').which.is.a.String();
      });
      it('Found line of tokens  and as a string', async () => {
         testEmail.should.be.have.property('accessToken').which.is.a.String();
         testEmail.should.be.have.property('refreshToken').which.is.a.String();
      });
      it('Found line of sid and as a string', async () => {
         testEmail.should.be.have.property('sid').which.is.a.String();
      });
      it('Found line of days  and as an array', async () => {
         testEmail.should.be.have.property('days').which.is.a.Array();
      });
   });
});
