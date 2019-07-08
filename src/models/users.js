import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MONGO_SALT = process.env.MONGO_SALT;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true, sparse: true }
  },
  password: String,
  userType: {
    type: String,
    enum: ["superAdmin", "normalAdmin"]
  },
  allowedOperations: [
    { type: String, enum: ["cars", "users", "insurances", "transactions"] }
  ],
  isActive: {
    type: String,
    enum: ["active", "suspended"]
  }
});

UserSchema.methods.generateHash = function generateHash(value) {
  return bcrypt.hash(value, MONGO_SALT);
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
