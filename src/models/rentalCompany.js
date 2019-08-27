"use strict";

import mongoose from "mongoose";
import { AVAILABLE, UNAVAILABLE } from "../utilities/constants";
import { validateUrl, localeObjectValidation } from "../utilities/validations";

const Schema = mongoose.Schema;

const RentalCompanySchema = new Schema({
  name: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true,
    unique: true
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true,
    unique: true
  },
  image: {
    type: String,
    unique: true
  },
  rating: {
    type: Number
  },
  perks: {
    type: [mongoose.Schema.Types.Mixed],
    validator: localeObjectValidation
  },
  locationAlias: {
    type: [mongoose.Schema.Types.Mixed],
    validator: localeObjectValidation
  },
  rentalCompanyStatus: {
    type: String,
    enum: [AVAILABLE, UNAVAILABLE],
    required: true
  },
  companyRepName: {
    type: String
  },
  companyPhoneNumber: {
    type: String
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("rental_companies", RentalCompanySchema);
