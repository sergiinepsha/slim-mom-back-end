const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const userModule = require('../users/user.model');
const { token, RequestError } = require('../helpers');

const { updateUserToken } = token;

async function authorize(req, res, next) {
   try {
      const authorizationHeader = req.get('Authorization' || '');
      const token = authorizationHeader.replace('Bearer ', '');

      const userId = await validationsToken(token);
      const user = await userModule.findById(userId);

      if (!user || user.accessToken !== token) {
         throw new RequestError('User not authorized', 401);
      }

      const validationsRefreshToken = await validationsToken(user.refreshToken);
      const updateToken = await updateUserToken(validationsRefreshToken);

      req.user = user;
      req.user.accessToken = updateToken;
      next();
   } catch (err) {
      next(err);
   }
}

async function validationsToken(token) {
   try {
      const userId = await jwt.verify(token, JWT_SECRET).id;
      return userId;
   } catch (err) {
      throw new RequestError('User not authorized', 401);
   }
}

module.exports = authorize;
