"use strict";

import mongoose from "mongoose";

const VerificationCodeSchema = new mongoose.Schema({
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

export default mongoose.model("VerificationCode", VerificationCodeSchema);
