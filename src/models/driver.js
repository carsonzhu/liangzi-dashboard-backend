"use strict";

import mongoose from "mongoose";
import {
  DRIVER_LICENSE_TYPE_CHINA,
  DRIVER_LICENSE_TYPE_OTHER
} from "../utilities/constants";

const DriverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  chineseName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  licenseType: {
    type: String,
    enum: [DRIVER_LICENSE_TYPE_CHINA, DRIVER_LICENSE_TYPE_OTHER],
    required: true
  }
});

const myDB = mongoose.connection.useDb(process.env.WEB_BACKEND_DB);

export default myDB.model("driver", DriverSchema);
