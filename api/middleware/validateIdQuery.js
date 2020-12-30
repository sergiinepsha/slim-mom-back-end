const {
   Types: { ObjectId },
} = require('mongoose');

module.exports = {
   validateIdQuery: (req, res, next) => {
      if (!ObjectId.isValid(req.params.id)) {
         throw new Error('This id is bad...').code(400);
      }

      next();
   },
};
