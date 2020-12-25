const {
   Types: { ObjectId },
} = require('mongoose');

const { RequestError } = require('../helpers');

async function validateIdQuery(req, res, next) {
   if (!ObjectId.isValid(req.params.id)) {
      throw new RequestError('This id is bad...', 400);
   }
   next();
}

module.exports = validateIdQuery;
