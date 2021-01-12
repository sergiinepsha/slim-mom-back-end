'use strict';

const { userToken } = require('./');

module.exports = token => {
   const verifyToken = userToken.validToken(token);

   const userId = verifyToken.id;

   return userId;
};
