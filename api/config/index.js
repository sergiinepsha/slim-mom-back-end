'use strict';

const path = require('path');

try {
   require('dotenv').config({ path: path.join(__dirname, '../../.env') });
} catch (error) {
   const err = new Error('Dotenv error');
   err.code = 500;
   throw err;
}

const { JWT_SECRET, MONGODB_URL, PORT, SALT, CORS_URL } = process.env;

module.exports = {
   corsUrl: CORS_URL,
   jwtSecret: JWT_SECRET,
   mongodbUrl: MONGODB_URL,
   port: PORT || 3100,
   salt: SALT,
};
