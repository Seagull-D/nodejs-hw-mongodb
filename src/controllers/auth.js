import { registerUser, loginUser, verifyUser, sendResetEmail, refreshUser, logoutUser } from '../servises/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokeValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokeValidUntil,
  });
};

export const registerController = async (req, res) => {
  const { name, email } = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfull register user',
    data: {
      name,
      email,
    },
  });
};

export const verifyController = async (req, res) => {
  await verifyUser(req.query.token);
  res.json({
    message: 'Email confirmed!',
  });
};

export const LoginController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const resetController = async (req, res) => {
  const { email } = req.body;
  await sendResetEmail(email);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {},
  });
};
export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};
