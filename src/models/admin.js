import mongoose from "../utilities/mongoose";
import bcrypt from "bcrypt";
import { SUPER_ADMIN, NORMAL_ADMIN } from "../utilities/constants";

const MONGO_SALT = process.env.MONGO_SALT;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true, sparse: true }
  },
  password: String,
  username: String,
  userType: {
    type: String,
    enum: [SUPER_ADMIN, NORMAL_ADMIN]
  },
  allowedOperations: [
    { type: String, enum: ["cars", "users", "insurances", "transactions"] }
  ],
  isActive: Boolean
});

UserSchema.methods.generateHash = function generateHash(value) {
  return bcrypt.hash(value, MONGO_SALT);
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compare(password, this.password);
};

const myDB = mongoose.connection.useDb(
  process.env.ENV === "development" ? process.env.DEV_DB : process.env.PROD_DB
);

export default myDB.model("admins", UserSchema);
