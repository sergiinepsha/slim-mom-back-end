const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const userModule = require('../users/user.model');
const { RequestError } = require('../helpers');

async function authorize(req, res, next) {
   try {
      const authorizationHeader = req.get('Authorization' || '');
      const token = authorizationHeader.replace('Bearer ', '');
      console.dir(req);

      let userId;
      try {
         userId = await jwt.verify(token, JWT_SECRET).id;
      } catch (err) {
         next(new RequestError('User not authorized', 401));
         // throw new RequestError('User not authorized', 401);
      }

      const user = await userModule.findById(userId);

      if (!user || user.accessToken !== token) {
         throw new RequestError('User not authorized', 401);
      }

      req.user = user;
      req.accessToken = token;
      req.refreshToken = user.refreshToken;
      req.sid = user.sid;
      next();
   } catch (err) {
      next(err);
   }
}

module.exports = authorize;
