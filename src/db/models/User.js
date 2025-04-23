import { Schema, model, now } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRedexp } from '../../constants/auth.js';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRedexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: Date(now),
    updatedAt: Date(now),
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);
export default UserCollection;
