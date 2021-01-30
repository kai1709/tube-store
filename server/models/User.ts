import mongoose, { Schema, Document } from "mongoose";
import { DateTime } from 'luxon'
import bcrypt from 'bcrypt';
import config from '../config'
import jwt from 'jwt-simple'

interface IUser extends Document {
  username: string;
  password: string;
  name: string;
}

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
})

UserSchema.pre<IUser>('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = config.ENV === 'development' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);

    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.method({
  async passwordMatches(password) {
    // @ts-ignore
    const result = await bcrypt.compare(password, this.password);

    return result;
  },
  token() {
    const date = DateTime.local();
    const payload = {
      _id: this._id,
      exp: date.plus({ minutes: parseInt(config.JWT_EXPIRATION_INTERVAL!, 10) }).toSeconds(),
      iat: date.toSeconds(),
    };

    return jwt.encode(payload, config.JWT_SECRET);
  },
});

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
