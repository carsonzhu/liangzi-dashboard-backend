"use strict";

import mongoose from "mongoose";
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
    validator: validateUrl,
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
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("rental_companies", RentalCompanySchema);
