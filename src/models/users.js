import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MONGO_SALT = process.env.MONGO_SALT;

const Schema = mongoose.Schema;

// TODO: add validation
const UserSchema = new Schema({
  password: String,
  email: {
    type: String,
    index: { unique: true, sparse: true }
  },
  userType: {
    type: String,
    enum: ["superAdmin", "normalAdmin"]
  },
  allowedOperations: [
    { type: String, enum: ["cars", "users", "insurances", "transactions"] }
  ]
});

UserSchema.methods.generateHash = function generateHash(value) {
  return bcrypt.hash(value, MONGO_SALT);
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
