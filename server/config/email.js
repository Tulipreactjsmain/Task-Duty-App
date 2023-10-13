import { createTransport } from "nodemailer";

const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Taskduty",
    to: toEmail,
    subject: "Password Reset",
    html: `
      <html>
        <body>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <p style="font-size: 16px; color: #333;">Click the following link to reset your password:</p>
        <a href="${resetLink}" style="font-size: 16px; color: #007BFF;">Reset Password</a>
        </div>   
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetPasswordEmail;
