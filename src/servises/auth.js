import createHttpError from 'http-errors';
import UsersCollection from '../db/models/User.js';
import sessionCollection from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { sendMail } from '../utils/sendEmail.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import { getEnvVar } from '../utils/getEnvVar.js';
import jwt from 'jsonwebtoken';
import { accessTokenLifeTime, refreshTokenLifeTime } from '../constants/auth.js';
import { TEMPLATES_DIR } from '../constants/index.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
  const refreshTokeValidUntil = Date.now() + refreshTokenLifeTime;
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokeValidUntil,
  };
};

const verifyMailPath = path.join(TEMPLATES_DIR, 'verify-email.html');
const resetMailPath = path.join(TEMPLATES_DIR, 'reset-password.html');

const appDomain = getEnvVar('APP_DOMAIN');
const jwsSecret = getEnvVar('JWT_SECRET');
export const findSession = (query) => sessionCollection.findOne(query);
export const findUser = (query) => UsersCollection.findOne(query);

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UsersCollection.create({ ...payload, password: hashPassword });
  const token = jwt.sign({ email }, jwsSecret, {
    expiresIn: '24h',
  });
  const templateSource = await fs.readFile(verifyMailPath, 'utf-8');
  const template = Handlebars.compile(templateSource);
  const html = template({
    verifyLink: `${appDomain}auth/verify?token=${token}`,
  });
  const verifyEmail = {
    to: email,
    subject: 'mail confirmation',
    text: 'Hello, click on link for verify mail',
    html,
  };
  sendMail(verifyEmail);
  return newUser;
};

export const verifyUser = (token) => {
  try {
    const { email } = jwt.verify(token, jwsSecret);
    return UsersCollection.findOneAndUpdate({ email }, { verify: true });
  } catch (error) {
    throw createHttpError(401, error.message);
  }
};

export const sendResetEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign({ email }, jwsSecret, { expiresIn: '15m' });

  const templateSource = await fs.readFile(resetMailPath, 'utf-8');
  const template = Handlebars.compile(templateSource);
  const html = template({
    resedPassworLink: `${appDomain}/auth/reset-password?token=${resetToken}`,
  });
  const resedPasswordEmail = {
    to: email,
    subject: 'reset password',
    text: 'Hello, click on link resed password',
    html,
  };
  try {
    await sendMail(resedPasswordEmail);
  } catch (error) {
    console.error('erropr send message', error);
  }
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
    console.log(entries);
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne({ _id: user._id }, { password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'invalid mail');
  }
  if (!user.verify) {
    throw createHttpError(401, 'mail is not verify');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'invalid password');
  }
  await sessionCollection.findOneAndDelete({ userId: user._id });
  const newSession = createSession();
  return sessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await findSession({ refreshToken, _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.refreshTokeValidUntil < Date.now()) {
    await sessionCollection.findOneAndDelete({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }
  await sessionCollection.findOneAndDelete({ _id: session._id });
  const newSessionRefresh = createSession();
  return sessionCollection.create({
    userId: session.userId,
    ...newSessionRefresh,
  });
};

export const logoutUser = (sessionId) => sessionCollection.deleteOne({ _id: sessionId });
