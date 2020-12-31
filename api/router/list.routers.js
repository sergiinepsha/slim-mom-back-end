const authRouter = require('../auth/auth.router');
const userRouter = require('../users/user.router');
const productRouter = require('../products/product.router');
const dailyRateRouters = require('../dailyRate/dailyRate.routers');
const dayRouter = require('../day/day.router');
const swaggerRouter = require('../swagger/swagger.router');

//CRUD
const listRouters = [
   {
      urn: '/auth',
      router: authRouter,
   },
   {
      urn: '/user',
      router: userRouter,
   },
   {
      urn: '/product',
      router: productRouter,
   },
   {
      urn: '/daily-rate',
      router: dailyRateRouters,
   },
   {
      urn: '/day',
      router: dayRouter,
   },
   {
      urn: '/api-docs',
      router: swaggerRouter,
   },
];

module.exports = listRouters;
