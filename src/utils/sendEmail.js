import nodemailer from 'nodemailer';
import 'dotenv/config';
import { getEnvVar } from './getEnvVar.js';
const host = getEnvVar('SMTP_HOST');
const port = getEnvVar('SMTP_PORT');
const user = getEnvVar('SMTP_USER');
const pass = getEnvVar('SMTP_PASSWORD');
const mailFrom = getEnvVar('SMTP_FROM');

const nodemailerConfig = {
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
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
  const email = { ...data, from: mailFrom };
  return transport.sendMail(email);
};
