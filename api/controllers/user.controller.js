'use strict';

module.exports = class UserController {
   static async getUser(req, res, next) {
      try {
         return res.status(200).json(req.user);
      } catch (error) {
         next(error);
      }
   }
};
