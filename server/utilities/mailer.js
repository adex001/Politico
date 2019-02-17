import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
     * @function sendMail
     * @email receiver's email
     * @link reset link
     * @returns {*} displays the password and sends a message to the email
     */
const sendMail = async (req, email, token) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: 'adex001@gmail.com',
    to: email,
    subject: 'Reset Password Link',
    html: `<h2>Hey! you have requested to change your password on Politico</h2>
    'You are receiving this because you (or someone else) have requested the reset of the password for your account with us at politico.<br>
    Please click on the following link, or paste this into your browser to complete the process:<br><br>
    https://${req.headers.host}/api/v1/auth/reset/${token} <br><br>
    If you did not request this, please ignore this email and your password will remain unchanged.<br>`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    if (result) return result;
  } catch (err) {
    return false;
  }
  return null;
};

export default sendMail;
