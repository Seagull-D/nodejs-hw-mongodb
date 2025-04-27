import nodemailer from 'nodemailer';
import 'dotenv/config';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   from: SMTP_FROM,
//   to: 'gojado8974@ancewa.com',
//   subject: 'Update password',
//   text: 'Hello, click on link',
//   html: '<h1>Hello, click on link</h1>',
// };

export const sendMail = (data) => {
  const email = { ...data, from: SMTP_FROM };
  return transport.sendMail(email);
};
