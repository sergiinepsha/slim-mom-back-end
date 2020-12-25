const { verifyEmailToken } = require('../models/index');

class EmailController {
   get verifyUser() {
      return this._verifyUser.bind(this);
   }

   //GET /auth/verify/:verification
   async _verifyUser(req, res, next) {
      try {
         const { verificationToken } = req.params;

         await verifyEmailToken(verificationToken);

         return res.status(200).json();
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new EmailController();
