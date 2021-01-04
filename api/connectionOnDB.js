'use strict';

const mongoose = require('mongoose');

const config = require('./config');

module.exports = () => {
   try {
      const connectDB = mongoose.connect(config.mongodbUrl, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: true,
      });

      if (connectDB) {
         console.log('\x1b[33m%s\x1b[0m', 'Database connection successful');
      }
   } catch (error) {
      const err = new Error('Not connect db');
      err.code = 500;
      return err;
   }
};
