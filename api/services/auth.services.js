'use strict';

const userModel = require('../models/user.model');

const { getUserIdFromToken } = require('../helpers');

module.exports = class AuthService {
   static async authorize(authorizationHeader) {
      try {
         if (!authorizationHeader) {
            const err = new Error('User not authorized');
            err.code = 401;
            throw err;
         }

         const token = authorizationHeader.replace('Bearer ', '');

         const userId = await getUserIdFromToken(token);

         const user = await userModel.findById(userId);

         if (!user || user.accessToken !== token) {
            const err = new Error('User not authorized');
            err.code = 401;
            throw err;
         }

         return user;
      } catch (error) {
         const err = new Error('User not authorized');
         err.code = 401;
         throw err;
      }
   }
};
