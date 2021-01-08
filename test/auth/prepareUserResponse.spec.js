//mocha test/auth/prepareUserResponse.test.js
const should = require('should');

const { prepareUserResponse } = require('../../api/helpers');

describe('Function helpers/prepareUserResponse()', () => {
   const user = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      sid: 'sid',
      email: 'test@test.com',
      name: 'name',
      userData: 'userData',
      password: 'password',
      _id: '_id',
      days: [{ date: '2015/03/03' }, { date: '2015/05/03' }],
   };
   const getUser = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      sid: 'sid',
      todaySummary: [],
      user: {
         email: 'test@test.com',
         name: 'name',
         userData: 'userData',
         _id: '_id',
      },
   };
   let returnData;
   let returnError;

   describe('If data has been transferred ', () => {
      beforeEach(() => {
         try {
            returnData = prepareUserResponse(user);
         } catch (error) {
            returnError = error;
         }
      });

      it('Returns the data you want', () => {
         should(returnData).be.have.properties(getUser);
      });
   });

   describe('If no data has been transferred', () => {
      beforeEach(async () => {
         try {
            await prepareUserResponse('');
         } catch (error) {
            returnError = error;
         }
      });
      it('Return error', () => {
         should(returnError).be.Error();
      });
   });
});
