// User model with role as enum (number)
import mongoose from 'mongoose';

export const ROLE = {
  AUTHOR: 0,
  REVIEWER: 1,
  EDITOR: 2,
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, enum: [ROLE.AUTHOR, ROLE.REVIEWER, ROLE.EDITOR], required: true },
  institution: { type: String },
  avatar: { type: String },
  bio: { type: String },
  website: { type: String },
  orcid: { type: String },
}, { timestamps: true });

// Virtual 'id' field that mirrors _id
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
