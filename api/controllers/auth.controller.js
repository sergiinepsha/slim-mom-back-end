'use strict';

const {
   getEmail,
   validPassword,
   createNewUser,
   verifyEmailToken,
   prepareUserResponse,
   userToken,
} = require('../helpers');

const AuthService = require('../services/auth.services');

const { addForUserTokens } = userToken;

module.exports = class AuthController {
   static async createUser(req, res, next) {
      try {
         const user = await createNewUser(req.body);

         return await res.status(201).json(user);
      } catch (error) {
         next(error);
      }
   }

   static async login(req, res, next) {
      try {
         const { email, password } = req.body;

         const userFromDb = await getEmail(email);

         await validPassword(password, userFromDb);

         const user = await addForUserTokens(userFromDb._id);

         const userData = prepareUserResponse(user);

         return res.status(201).json(userData);
      } catch (error) {
         next(error);
      }
   }

   static async logout(req, res, next) {
      try {
         const user = req.user;

         await addForUserTokens(user.sid, null);

         return res.status(204).end();
      } catch (error) {
         next(error);
      }
   }

   static async refresh(req, res, next) {
      try {
         const user = req.user;

         const { accessToken, refreshToken } = await addForUserTokens(user.id);
         res.set('Authorization', `Bearer ${accessToken}`);
         res.set('Refresh-Authorization', `Bearer ${refreshToken}`);

         return res.status(201).json({ accessToken, refreshToken });
      } catch (error) {
         next(error);
      }
   }

   static async authRefresh(req, res, next) {
      try {
         const RefreshHeader = req.get('Refresh-Authorization' || '');

         req.user = await AuthService.refresh(RefreshHeader);

         next();
      } catch (error) {
         next(error);
      }
   }

   static async authorize(req, res, next) {
      try {
         const authorizationHeader = req.get('Authorization' || '');

         req.user = await AuthService.authorize(authorizationHeader);

         next();
      } catch (err) {
         next(err);
      }
   }

   static async verifyUserByEmail(req, res, next) {
      try {
         const { verificationToken } = req.params;

         await verifyEmailToken(verificationToken);

         return res.status(200).json();
      } catch (error) {
         next(error);
      }
   }

   static async verifyUserByEmail(req, res, next) {
      try {
         const { verificationToken } = req.params;

         await verifyEmailToken(verificationToken);

         return res.status(200).json();
      } catch (error) {
         next(error);
      }
   }
};
