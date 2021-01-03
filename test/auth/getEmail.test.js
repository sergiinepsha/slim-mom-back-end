//mocha api/auth/handlers/auth/getEmail.test.js
const sinon = require('sinon');
const mongoose = require('mongoose');
const should = require('should');

const { getEmail } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');

describe('getEmail', () => {
   let testEmail;

   beforeEach(async () => {
      await connectionOnDB();
      testEmail = await getEmail('bip@bip.com');
   });

   after(() => {
      mongoose.disconnect();
   });

   it('Get user by email from database', () => {
      testEmail.should.be.containDeep({ email: 'bip@bip.com' });
   });

   it('Return throw', () => {});
});
