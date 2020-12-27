const productModel = require('../products/product.model');
const userModel = require('../users/user.model');

async function middleware(date, productId, weight, userId, dailyRate) {
   const daySummary = await dayModel.findOne({ date });
   if (daySummary) {
      daySummary._doc.eatenProducts.push(eatenProduct);
   }
   const eatenProducts = daySummary ? daySummary._doc.eatenProducts : [eatenProduct];
   const kcalConsumed = !daySummary
      ? (eatenProduct.calories * weight) / 100
      : eatenProducts.reduce((acc, { calories }) => acc + (calories * weight) / 100, 0);
   const kcalLeft = dailyRate - kcalConsumed;
   const percentsOfDailyRate = (kcalConsumed / dailyRate) * 100;
   // обьект для добавления в day
   const objDayDB = {
      eatenProducts,
      date,
      daySummary: {
         kcalLeft,
         kcalConsumed,
         dailyRate,
         percentsOfDailyRate,
         userId,
      },
   };

   return objDayDB;
}

module.exports = { middleware };
