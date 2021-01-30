import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
