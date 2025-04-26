import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';
import sessionCollection from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { accessTokenLifeTime, refreshTokenLifeTime } from '../constants/auth.js';

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

export const findSession = (query) => sessionCollection.findOne(query);
export const findUser = (query) => UserCollection.findOne(query);
export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return await UserCollection.create({ ...payload, password: hashPassword });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'invalid mail');
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
