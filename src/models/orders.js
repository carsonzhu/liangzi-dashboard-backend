"use strict";

import mongoose from "mongoose";
import {
  ALIPAY,
  WECHATPAY,
  VISA,
  MASTER,
  WAITTOCHOOSE
} from "../utilities/constants";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  driverId: {
    type: String,
    required: true
  },
  vehicleId: {
    type: String,
    required: true
  },
  insuranceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "insurances"
  },
  pickupLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true
  },
  returnLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true
  },
  pickTime: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  returnTime: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: [ALIPAY, WECHATPAY, VISA, MASTER, WAITTOCHOOSE]
  },
  paymentId: String,
  amount: Number,
  currency: String,
  amountPaid: Number,
  email: String,
  phone: String,
  status: {
    type: String,
    required: true
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("order", OrderSchema);
