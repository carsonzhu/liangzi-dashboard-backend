import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const MONGO_SALT = process.env.MONGO_SALT;

const Schema = mongoose.Schema;

// TODO: add validation
const UserSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    index: { unique: true, sparse: true }
  },
  phoneCountryCode: String,
  phoneNumber: String, //easy phone validation
  wechatId: {
    //openid
    type: String,
    index: { unique: true, sparse: true }
  }
});

UserSchema.index(
  { phoneCountryCode: 1, phoneNumber: 1 },
  { unique: true, sparse: true }
);

UserSchema.methods.generateHash = function generateHash(value) {
  return bcrypt.hash(value, MONGO_SALT);
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compare(password, this.password);
};

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("User", UserSchema);
