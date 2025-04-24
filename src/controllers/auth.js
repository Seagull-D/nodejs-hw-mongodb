import { registerUser, loginUser } from '../servises/auth.js';

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

export const LoginController = async (req, res) => {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    htppOnly: true,
    expires: session.refreshTokeValidUntil,
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
