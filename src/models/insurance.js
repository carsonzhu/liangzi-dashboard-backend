"use strict";

import mongoose from "mongoose";
import { localeObjectValidation } from "../utilities/validations";

const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
  rentalCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "rental_companies"
  },
  rentalCompanyName: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  name: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  dailyRate: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  dailyRateUnit: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("insurances", InsuranceSchema);
