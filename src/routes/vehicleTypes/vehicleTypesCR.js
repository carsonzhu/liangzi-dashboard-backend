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
    const { type, trunkSize, seats } = req.body;

    if (!type || !trunkSize || !seats) {
      return res.status(400).json({
        status: 400,
        description: "missing fields"
      });
    }

    const newVehicleType = await createVehicleTypeAsync({
      type,
      trunkSize,
      seats
    });

    return res.status(200).json({
      status: 200,
      data: {
        newVehicleType
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
