'use strict';

module.exports = (bloodType, eatenProduct) => {
   const { title, groupBloodNotAllowed } = eatenProduct;

   if (groupBloodNotAllowed[bloodType]) {
      return title.ru;
   }
};
