const { getEmail, validPassword, createNewUser } = require('../models/index');
const { token } = require('../../../helpers');

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
   get getRefreshUser() {
      return this._getRefreshUser.bind(this);
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
         await updateUserToken(user._id, null);
         return await res.status(204);
      } catch (error) {
         next(error);
      }
   }

   //GET /auth/refresh
   async _getRefreshUser(req, res, next) {
      try {
         const userForResponse = this.prepareUserResponse(req.user);
         return res.status(200).json(userForResponse);
      } catch (error) {
         next(error);
      }
   }

   prepareUserResponse(user) {
      const { email, subscription } = user;
      return { email, subscription };
   }
}

module.exports = new AuthController();
