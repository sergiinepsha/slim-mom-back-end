const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectionOnDB = require('./connectionOnDB');

const { RequestError } = require('./helpers');

// const userRouter = require('./users/user.router');
// const authRouter = require('./auth/auth.router');
// const productRouter = require('./products/product.router');
// const dailyRateRouters = require('./dailyRate/dailyRate.routers');
// const dayRouter = require('./day/day.router');
// const swaggerRouter = require('./swagger/swagger.router');

const { apiRouter } = require('./router');
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
      this.server.use(cors({ origin: `http://localhost:3000` })); //TODO: вставить адрес фронта с netlify
   }

   initRoutes() {
      this.server.use('/', apiRouter);

      // this.server.use('/user', userRouter);
      // this.server.use('/auth', authRouter);
      // this.server.use('/product', productRouter);
      // this.server.use('/daily-rate', dailyRateRouters);
      // this.server.use('/day', dayRouter);
      // this.server.use('/api-docs', swaggerRouter);

      this.server.use((err, req, res, next) => {
         return res
            .status(err.status || 500)
            .json({ message: err.message || 'Something went wrong' });
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
