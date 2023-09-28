import { createTransport } from "nodemailer";

const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL, 
      pass: process.env.GMAIL_APP_PASSWORD, 
    },
  });

  const mailOptions = {
    from: "Taskduty",
    to: toEmail,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetPasswordEmail;
