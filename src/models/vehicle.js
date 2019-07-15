"use strict";

import mongoose from "mongoose";
import {
  AUTOMATIC,
  MANUAL,
  AVAILABLE,
  UNAVAILABLE,
  RENTED
} from "../utilities/constants";
import { validateUrl, localeObjectValidation } from "../utilities/validations";

const VehicleSchema = new mongoose.Schema({
  dailyRateDisplay: {
    type: Number,
    required: true
  },
  dailyRate: {
    type: Number,
    required: true
  },
  dailyRateUnit: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  pickupLocationIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
    required: true
  },
  returnLocationIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "locations" }],
    required: true
  },
  specialServices: {
    type: [mongoose.Schema.Types.Mixed],
    validator: localeObjectValidation,
    default: 0
  },
  transmission: {
    type: String,
    enum: [AUTOMATIC, MANUAL],
    required: true
  },
  vehicleTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle_types",
    required: true
  },
  rentalCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "rental_companies"
  },
  vehicleMake: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  vehicleImage: {
    type: String,
    validator: validateUrl,
    unique: true
  },
  vehicleNotes: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  insuranceIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "insurances" }],
    required: true
  },
  vehicleStatus: {
    type: String,
    enum: [AVAILABLE, UNAVAILABLE, RENTED],
    required: true
  }
});

export default mongoose.model("vehicles", VehicleSchema);
