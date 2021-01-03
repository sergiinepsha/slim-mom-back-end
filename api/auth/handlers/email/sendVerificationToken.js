const uuid = require('uuid');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { MY_PASS_MAIL, MY_MAIL, PORT, _PORT } = process.env;

const userModel = require('../../../users/user.model');

const transport = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: MY_MAIL,
      pass: MY_PASS_MAIL,
   },
});

const mailOptions = (email, verifyToken, text) => {
   return {
      from: MY_MAIL,
      to: email,
      subject: 'Email verification',
      html: `<a href="http://localhost:${PORT || _PORT}/auth/verify/${verifyToken}">${text} </a>`,
   };
};

module.exports = sendVerificationToken = async user => {
   try {
      const verificationToken = uuid.v4();
      const updateId = await userModel.createVerificationToken(user._id, verificationToken);

      await transport.sendMail(
         mailOptions(updateId.email, verificationToken, 'Your verification token'),
      );

      return updateId;
   } catch (error) {
      throw error;
   }
};
