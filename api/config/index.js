'use strict';

const path = require('path');

try {
   require('dotenv').config({ path: path.join(__dirname, '../../.env') });
} catch (error) {
   const err = new Error('Dotenv error');
   err.code = 500;
   throw err;
}

module.exports = {
   corsUrl: 'http://localhost:3000', //TODO: вставить адрес фронта с netlify
   jwtSecret: process.env.JWT_SECRET,
   mongodbUrl: process.env.MONGODB_URL,
   port: process.env.PORT,
   salt: process.env.SALT,
};
