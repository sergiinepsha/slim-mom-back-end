'use strict';

const { userToken } = require('./');

module.exports = token => {
   console.log('token 0 >>>>', token);
   console.log('token 1 >>>>');
   try {
      const userId = userToken.validToken(token).id;
   } catch (error) {
      console.log('token error >>>');
      console.dir(error);
   }
   const userId = userToken.validToken(token).id;
   console.log('token 2>>>>', userId);
   console.log('token 3 >>>>');
   return userId;
};
