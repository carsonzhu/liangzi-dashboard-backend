"use strict";

import mongoose, { Schema } from "mongoose";

const VerificationCodeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: { unique: true, sparse: true }
  }
});

VerificationCodeSchema.index({ unique: true, sparse: true });

const myDB = mongoose.connection.useDb(
  process.env.ENV === "development" ? process.env.DEV_DB : process.env.PROD_DB
);

export default myDB.model("VerificationCode", VerificationCodeSchema);
