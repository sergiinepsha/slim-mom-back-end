const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const userModule = require('../users/user.model');
const { RequestError } = require('../helpers');

async function authorize(req, res, next) {
   try {
      // 1. достать токен пользователя с заголовка Authorization
      const authorizationHeader = req.get('Authorization' || '');
      const token = authorizationHeader.replace('Bearer ', ''); // убрали слово Bearer  и получили чистый токен

      // 2. достать id пользователя с пейлоада или вернуть пользователю
      // ошибку со статус кодом 401
      let userId;
      try {
         userId = await jwt.verify(token, JWT_SECRET).id;
      } catch (err) {
         next(new RequestError('User not authorized', 401));
         // throw new RequestError('User not authorized', 401);
      }
      // 3. достать соответствующего пользователя. Если такого нет - вернуть
      // ошибку со статус кодом 401
      // userModel - модель пользователя в нашей системе
      const user = await userModule.findById(userId);
      console.dir(user);
      if (!user || user.accessToken !== token) {
         throw new RequestError('User not authorized', 401);
      }

      // 4. Если все прошло успешно - передать запись пользователя и токен в req
      // и передать обработку запроса на следующий middleware
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
