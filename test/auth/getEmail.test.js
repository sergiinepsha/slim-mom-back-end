//mocha api/auth/handlers/auth/getEmail.test.js
const sinon = require('sinon');
const mongoose = require('mongoose');
const should = require('should');

const { getEmail } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');

describe('Function helpers/getEmail()', () => {
   let emailTest = 'bip@bip.com';
   let testEmail;

   beforeEach(async () => {
      await connectionOnDB();
      testEmail = await getEmail(emailTest);
   });

   afterEach(() => {
      mongoose.disconnect();
   });

   it('Get user by email from database whit corrected answered ', () => {
      // testEmail.should.be.containDeep({ email: 'bip@bip.com' });
      testEmail.should.be.ok();
      testEmail.should.be.have.property('name').which.is.a.String();
      testEmail.should.be.have.property('email').which.is.a.String();
      testEmail.should.be.have.property('password').which.is.a.String();
      testEmail.should.be.have.property('accessToken').which.is.a.String();
      testEmail.should.be.have.property('refreshToken').which.is.a.String();
      testEmail.should.be.have.property('sid').which.is.a.String();
      testEmail.should.be.have.property('days').which.is.a.Array();
   });
   it('When no email  it throw error 401', async () => {
      return await await getEmail('s').should.be.rejectedWith(Error, {
         code: 401,
         message: 'Email or password is wrong',
      });
   });
});
