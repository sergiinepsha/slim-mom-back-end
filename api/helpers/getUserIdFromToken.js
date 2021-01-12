'use strict';

const { userToken } = require('./');

module.exports = token => {
   console.log('token 0 >>>>', token);
   console.log('token 1 >>>>');
   const userId = userToken.validToken(token).id;
   console.log('token 2>>>>', userId);
   console.log('token 3 >>>>');
   return userId;
};
