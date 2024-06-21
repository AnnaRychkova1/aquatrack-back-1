import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendMail(message) {
  return transport.sendMail(message);
}

export default { sendMail };
