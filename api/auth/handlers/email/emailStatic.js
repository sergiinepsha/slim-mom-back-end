//verification
async function createVerificationToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { verificationToken: newToken }, { new: true });
}
async function fineByVerificationToken(verificationToken) {
   return await this.findOne({ verificationToken });
}
async function verifyUser(userID) {
   return await this.findByIdAndUpdate(
      userID,
      {
         status: 'Verified',
         verificationToken: null,
      },
      { new: true },
   );
}

module.exports = {
   verifyUser,
   fineByVerificationToken,
   createVerificationToken,
};
