const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { apiRouter } = require('./router');
const connectionOnDB = require('./connectionOnDB');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { PORT } = process.env;

module.exports = class SlimMomServer {
   constructor() {
      this.server = null;
   }

   start() {
      this.initServer();
      this.initLogger();
      this.initMiddlewares();
      this.initRoutes();
      this.initDB();
      return this.startListening();
   }

   initServer() {
      this.server = express();
   }

   initLogger() {
      this.server.use(morgan('dev'));
   }

   initMiddlewares() {
      this.server.use(express.urlencoded());
      this.server.use(express.json());
      //TODO: вставить адрес фронта с netlify
      this.server.use(cors({ origin: `http://localhost:3000` }));
   }

   initRoutes() {
      this.server.use('/', apiRouter);

      this.server.use((req, res, next) => {
         const error = new Error('Resource not found');
         error.code = 404;
         next(error);
      });

      this.server.use((err, req, res, next) => {
         const code = err.code || err.status || 500;
         const message = err.message || 'Internal Server Error';
         return res.status(code).json({ message });
      });
   }

   initDB() {
      try {
         connectionOnDB();
      } catch (error) {
         process.exit(1);
      }
   }

   startListening() {
      return this.server.listen(PORT, () => {
         console.log('\x1b[36m%s\x1b[0m', `Server started listening on port ${PORT}`);
      });
   }
};
