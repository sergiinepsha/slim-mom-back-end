'use strict';

const { userToken } = require('./');

module.exports = token => {
   const verifyToken = userToken.validToken(token);

   return verifyToken.id;
};
