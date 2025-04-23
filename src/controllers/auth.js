import { registerUser } from '../servises/auth.js';

export const registerController = async (req, res) => {
  await registerUser(req.body);
  res.json({
    message: 'Successfull register user',
  });
};
