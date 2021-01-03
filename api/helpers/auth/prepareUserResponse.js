'use strict';

module.exports = user => {
   const { _id, email, name, userData, accessToken, refreshToken, sid, days } = user;

   const nowDAte = new Date().toDateString();

   const todaySummary = days.filter(value => new Date(value.date).toDateString() === nowDAte);

   return {
      accessToken,
      refreshToken,
      sid,
      todaySummary,
      user: {
         email,
         name,
         userData,
         _id,
      },
   };
};
