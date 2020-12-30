const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;

const connectionOnDB = () => {
   try {
      const connectDB = mongoose.connect(MONGODB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: true,
      });

      if (connectDB) {
         console.log('\x1b[33m%s\x1b[0m', 'Database connection successful');
      }
   } catch (error) {
      return new Error('Not connect db').code(500);
   }
};

module.exports = connectionOnDB;
