module.exports = {
   findUserByIdAndUpdateDays: async (userId, day) => {
      try {
         const { _id, date } = day;

         return await this.findByIdAndUpdate(userId, { $push: { days: { id: _id, date } } });
      } catch (error) {
         throw error;
      }
   },
   findUserByIdAndUpdateUserData: async (userId, reqBody, dailyRate) => {
      try {
         return await this.findByIdAndUpdate(
            userId,
            { userData: { ...reqBody, dailyRate } },
            { new: true },
         );
      } catch (error) {
         throw error;
      }
   },
};
