//auth
async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
}

async function updateAccessToken(id, accessToken) {
   return await this.findByIdAndUpdate(id, { accessToken }, { new: true });
}

async function addTokensForUser(id, accessToken, refreshToken) {
   return await this.findByIdAndUpdate(id, { accessToken, refreshToken, sid: id }, { new: true });
}

async function findUserByEmail(email) {
   try {
      return await this.findOne({ email });
   } catch (error) {
      throw error;
   }
}

module.exports = {
   findUserByEmail,
   addTokensForUser,
   updateAccessToken,
   findUserByIdAndUpdate,
};
// module.exports = {
//    findUserByEmail: async email => {
//       try {
//          console.dir(this);
//          return await this.findOne({ email });
//       } catch (error) {
//          throw error;
//       }
//    },

//    addTokensForUser: async (id, accessToken, refreshToken) => {
//       try {
//          return await this.findByIdAndUpdate(
//             id,
//             {
//                accessToken,
//                refreshToken,
//                sid: id,
//             },
//             {
//                new: true,
//             },
//          );
//       } catch (error) {
//          throw error;
//       }
//    },
//    updateAccessToken: async (id, accessToken) => {
//       try {
//          return await this.findByIdAndUpdate(
//             id,
//             {
//                accessToken,
//             },
//             {
//                new: true,
//             },
//          );
//       } catch (error) {
//          throw error;
//       }
//    },
//    findUserByIdAndUpdate: async (userID, newParams) => {
//       try {
//          return await this.findByIdAndUpdate(
//             userID,
//             {
//                $set: newParams,
//             },
//             {
//                new: true,
//             },
//          );
//       } catch (error) {
//          throw error;
//       }
//    },
// };
