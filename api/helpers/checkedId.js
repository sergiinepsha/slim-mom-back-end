'use strict';

const {
   Types: { ObjectId },
} = require('mongoose');

module.exports = id => {
   if (!ObjectId.isValid(id)) {
      const err = new Error('Invalid id');
      err.code = 404;
      throw err;
   }
};
