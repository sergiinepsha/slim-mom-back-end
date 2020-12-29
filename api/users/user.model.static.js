async function findUserByIdAndUpdateDays(userId, day) {
   const { _id, date } = day;
   return await this.findByIdAndUpdate(userId, { $push: { days: { id: _id, date } } });
}

async function findUserByIdAndUpdateUserData(userId, reqBody, dailyRate) {
   return await this.findByIdAndUpdate(
      userId,
      { userData: { ...reqBody, dailyRate } },
      { new: true },
   );
}

module.exports = {
   findUserByIdAndUpdateDays,
   findUserByIdAndUpdateUserData,
};
