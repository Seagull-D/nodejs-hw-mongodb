import UserCollection from '../db/models/User.js';

export const registerUser = async (payload) => {
  return await UserCollection.create(payload);
};
