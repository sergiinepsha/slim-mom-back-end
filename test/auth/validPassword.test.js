const sinon = require('sinon');
const should = require('should');
const mongoose = require('mongoose');

const { validPassword, getEmail } = require('../../api/helpers');
const connectionOnDB = require('../../api/connectionOnDB');

describe('Function helpers/validPassword()', () => {
   let emailTest = 'bip@bip.com';
   let getUser;
   let validTrue;

   before(async () => {
      await connectionOnDB();
   });

   beforeEach(async () => {
      getUser = await getEmail(emailTest);
      validTrue = await validPassword('123123', getUser);
   });
   afterEach(() => {});

   after(() => {
      mongoose.disconnect();
   });

   describe('Password is valid and returned data', () => {
      it('Returned true', async () => {
         await validTrue.should.be.true();
      });
   });

   describe('Password is not valid and some error', () => {
      it('It throw error status 401', async () => {
         return await validPassword('errorPass', getUser).should.be.rejectedWith(Error, {
            code: 401,
         });
      });
      it('It throw error message true', async () => {
         return await validPassword('errorPass', getUser).should.be.rejectedWith(Error, {
            message: 'Email or password is wrong',
         });
      });
      it('It throw error user null and undefine', async () => {
         return await validPassword('errorPass', {}).should.be.rejectedWith(Error, {
            message: 'Illegal arguments: string, undefined',
         });
      });
   });
});
