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

const Schema = mongoose.Schema;

const NewVehicleSchema = new Schema({
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

  locationAddress: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },

  locationHours: {
    mon: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    tue: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    wed: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    thur: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    fri: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    sat: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    sun: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    }
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

  vehicleType: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  trunkSize: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
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
    data: Buffer,
    contentType: String
  },
  vehicleImageStr: {
    type: String
  },
  vehicleImageStr: {
    type: String
    // required: true
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

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("newVehicles", NewVehicleSchema);
