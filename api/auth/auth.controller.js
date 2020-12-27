const { now } = require('mongoose');
const { getEmail, validPassword, createNewUser, verifyEmailToken } = require('./handlers');
const { token } = require('./helpers');

const { updateUserToken, addForUserTokens } = token;

class AuthController {
   get createUser() {
      return this._createUser.bind(this);
   }
   get login() {
      return this._login.bind(this);
   }
   get logout() {
      return this._logout.bind(this);
   }
   get getCurrentUser() {
      return this._getCurrentUser.bind(this);
   }
   get verifyUserByEmail() {
      return this._verifyUserByEmail.bind(this);
   }

   //GET /auth/verify/:verification
   async _verifyUserByEmail(req, res, next) {
      try {
         const { verificationToken } = req.params;

         await verifyEmailToken(verificationToken);

         return res.status(200).json();
      } catch (error) {
         next(error);
      }
   }

   //POST /auth/register
   async _createUser(req, res, next) {
      try {
         const newUser = await createNewUser(req.body);
         return await res.status(201).json(newUser);
      } catch (error) {
         next(error);
      }
   }

   //POST /auth/login
   async _login(req, res, next) {
      try {
         const { email, password } = req.body;

         const userFromDb = await getEmail(email);

         await validPassword(password, userFromDb);

         const user = await addForUserTokens(userFromDb._id);

         const userData = await this.prepareUserResponse(user);
         return res.send(userData).status(201);
      } catch (error) {
         next(error);
      }
   }

   //post /auth/logout

   async _logout(req, res, next) {
      try {
         console.log('>>>>>', req);
         const user = req.user;
         await updateUserToken(user.sid, null);
         return res.status(204).send();
      } catch (error) {
         next(error);
      }
   }

   //GET /auth/verify/:verification
   async _verifyUserByEmail(req, res, next) {
      try {
         const { verificationToken } = req.params;

         await verifyEmailToken(verificationToken);

         return res.status(200).json();
      } catch (error) {
         next(error);
      }
   }

   prepareUserResponse(user) {
      const { email, name, userData, accessToken, refreshToken, sid, days } = user;
      const nowDAte = new Date().toDateString();
      const todaySummary = days.filter(value => new Date(value.date).toDateString() === nowDAte);
      return {
         accessToken,
         refreshToken,
         sid,
         todaySummary,
         user: {
            email,
            name,
            userData,
            id: sid,
         },
      };
   }
}

module.exports = new AuthController();
