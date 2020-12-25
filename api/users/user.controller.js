const Joi = require('joi');

class UserController {
   get getUser() {
      return this._getUser.bind(this);
   }

   async _getUser(req, res, next) {
      try {
         return res.status(200).send(req.user);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new UserController();
