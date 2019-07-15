import mongoose from "mongoose";
import { SUPER_ADMIN, NORMAL_ADMIN } from "../utilities/constants";

const Schema = mongoose.Schema;

const vehicleCreatorSchema = new Schema({
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

export default mongoose.model("User", vehicleCreatorSchema);
