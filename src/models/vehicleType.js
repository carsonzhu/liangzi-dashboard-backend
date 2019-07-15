"use strict";

import mongoose from "mongoose";
import { localeObjectValidation } from "../utilities/validations";

const Schema = mongoose.Schema;

const VehicleTypeSchema = new Schema({
  type: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true,
    unique: true
  },
  trunkSize: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("vehicle_types", VehicleTypeSchema);
