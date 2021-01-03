'use strict';

const userModel = require('../models/user.model');

const { getUserIdFromToken } = require('../helpers');

module.exports = class AuthService {
   static async authorize(authorizationHeader) {
      try {
         const token = authorizationHeader.replace('Bearer ', '');
         const userId = await getUserIdFromToken(token);

         const user = await userModel.findById(userId);

         if (!user || user.accessToken !== token) {
            throw new Error('User not authorized').code(401);
         }

         return user;
      } catch (error) {
         throw error;
      }
   }
};
