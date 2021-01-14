'use strict';

const { userToken } = require('./');

module.exports = token => userToken.validToken(token).id;
