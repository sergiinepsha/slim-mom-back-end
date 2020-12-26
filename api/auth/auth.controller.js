const { getEmail, validPassword, createNewUser } = require('./handlers');
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

   //PUT /auth/login
   async _login(req, res, next) {
      try {
         const { email, password } = req.body;

         const userFromDb = await getEmail(email);

         await validPassword(password, userFromDb);

         const { accessToken, refreshToken, sid } = await addForUserTokens(userFromDb._id);

         return res.status(201).json({ accessToken, refreshToken, sid });
      } catch (error) {
         next(error);
      }
   }

   //PATCH /auth/:contactId/logout
   async _logout(req, res, next) {
      try {
         const user = req.user;
         await updateUserToken(user.sid, null);
         return res.status(204).send();
      } catch (error) {
         next(error);
      }
   }

   //GET /auth/current
   async _getCurrentUser(req, res, next) {
      try {
         const userForResponse = this.prepareUserResponse(req.user);
         return res.status(200).json(userForResponse);
      } catch (error) {
         next(error);
      }
   }

   prepareUserResponse(user) {
      const { email, name, accessToken, refreshToken, sid } = user;
      return { email, name, accessToken, refreshToken, sid };
   }
}

module.exports = new AuthController();
