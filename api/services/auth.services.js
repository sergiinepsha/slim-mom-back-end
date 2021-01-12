'use strict';

const userModel = require('../models/user.model');

const { getUserIdFromToken } = require('../helpers');

module.exports = class AuthService {
   static async authorize(authorizationHeader) {
      try {
         console.log('message auth 1>>>');
         if (!authorizationHeader) {
            const err = new Error('User not authorized');
            err.code = 401;
            throw err;
         }
         console.log('message auth 2>>>');
         const token = authorizationHeader.replace('Bearer ', '');
         console.dir(token);
         console.log('message auth 3>>>');
         const userId = await getUserIdFromToken(token);
         console.log('message auth 4>>>');
         const user = await userModel.findById(userId);
         console.log('message auth 5>>>');
         if (!user || user.accessToken !== token) {
            const err = new Error('User not authorized');
            err.code = 401;
            throw err;
         }
         console.log('message auth 6>>>');
         return user;
      } catch (error) {
         const err = new Error('User not authorized');
         err.code = 401;
         throw err;
      }
   }

   static async refresh(refreshHeader) {
      try {
         console.log('message refresh 1>>>');
         if (!refreshHeader) {
            const err = new Error('User not authorized');
            err.code = 403;
            throw err;
         }
         console.log('message refresh 2>>>');
         const token = refreshHeader.replace('Bearer ', '');
         console.log('message refresh 3>>>');
         const userId = await getUserIdFromToken(token);
         console.log('message refresh 4>>>');
         const user = await userModel.findById(userId);
         console.log('message refresh 5>>>');
         if (!user || user.refreshToken !== token) {
            const err = new Error('User not authorized');
            err.code = 403;
            throw err;
         }
         console.log('message refresh 6>>>');
         return user;
      } catch (error) {
         const err = new Error('User not authorized');
         err.code = 403;
         throw err;
      }
   }
};
