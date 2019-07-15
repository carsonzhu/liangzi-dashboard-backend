"use strict";

import mongoose from "mongoose";
import { localeObjectValidation } from "../utilities/validations";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
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
  alias: {
    type: [mongoose.Schema.Types.Mixed],
    validator: localeObjectValidation,
    required: true
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
    validator: localeObjectValidation,
    required: true
  },
  hours: {
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
  timezone: {
    type: String,
    required: true
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("locations", LocationSchema);
