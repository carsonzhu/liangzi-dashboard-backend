"use strict";

import logger from "../../utilities/logger";

import { getVehicleTypesAsync, createVehicleTypeAsync } from "./utilities";

const getVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await getVehicleTypesAsync();

    return res.status(200).json({
      status: 200,
      data: {
        vehicleTypes
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

const createVehicleType = async (req, res) => {
  try {
    const { email, password, userType, username, allowedOperations } = req.body;

    if (!email || !password || !userType || !username) {
      return res.status(400).json({
        status: 400,
        description: "missing fields"
      });
    }

    // Check if email exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        description: "Email exists"
      });
    }

    const newUser = await addUserFunc({
      email,
      password,
      userType,
      username,
      allowedOperations
    });

    console.log("newUser", newUser);

    return res.status(200).json({
      status: 200,
      data: {
        newUser
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

export { getVehicleTypes, createVehicleType };
