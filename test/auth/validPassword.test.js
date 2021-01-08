const sinon = require('sinon');
const should = require('should');

const { validPassword } = require('../../api/helpers');
const hash = require('../../api/helpers/hash');
const { hashPassword } = require('../../api/helpers/hash');

describe('Function helpers/validPassword()', () => {
   let data = { password: '123123' };
   let hashPass;
   let errorPass;

   describe('Password is not valid and some error', () => {
      before(async () => {
         try {
            validTrue = await validPassword(data.password, data);
         } catch (error) {
            errorPass = error;
         }
      });
      after(() => {
         sinon.restore();
      });

      it('Should throw error ', () => {
         errorPass.should.be.Error();
      });

      it('It throw error status 401', () => {
         errorPass.should.be.containDeep({
            code: 401,
         });
      });
      it('It throw error message true', () => {
         errorPass.should.be.containDeep({
            message: 'Email or password is wrong',
         });
      });
      it('It throw error user null and undefine', async () => {
         return await validPassword('errorPass', {}).should.be.rejectedWith(Error, {
            message: 'Illegal arguments: string, undefined',
         });
      });
   });
   describe('The password validation was walked good', () => {
      let answerFunc;
      beforeEach(async () => {
         try {
            hashPass = await hashPassword(data.password);
            answerFunc = await validPassword(data.password, {
               password: hashPass,
            });
         } catch (error) {
            errorPass = error;
         }
      });

      afterEach(() => {
         sinon.restore();
      });

      it('The password validation return true', () => {
         answerFunc.should.be.true;
      });

      it('getHashPassword return the valid answer', () => {
         hashPass = sinon.stub(hash, 'getHashPassword').callsFake(() => data.password);
         should(hash.getHashPassword(data.password, hashPass)).be.ok();
         should(hash.getHashPassword(data.password, hashPass)).be.equal(data.password);
      });
   });
});
