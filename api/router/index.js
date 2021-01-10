'use strict';

module.exports = server => {
   server.use('/user', require('./user.router'));
   server.use('/auth', require('./auth.router'));
   server.use('/product', require('./product.router'));
   server.use('/daily-rate', require('./dailyRate.router'));
   server.use('/day', require('./day.router'));
   server.use('/api-docs', require('./swagger.router'));
};
