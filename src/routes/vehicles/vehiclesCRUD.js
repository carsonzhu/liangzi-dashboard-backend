import logger from "../../utilities/logger";

import {
  getSingleVehicleAsync,
  getVehiclesAsync,
  addVehicleAsync,
  updateVehicleAsync,
  removeVehicleAsync,
  advancedVehicleQuery
} from "./utilities";

import { UNAVAILABLE } from "../../utilities/constants";

export const getVehicles = async (req, res) => {
  try {
    const result = await getVehiclesAsync();

    return res.status(200).json({
      status: 200,
      data: {
        result
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

export const getSingleVehicle = async (req, res) => {
  logger.info({ url: req.url }, "receive request");

  const { vehicleId = null, language = null } = req.params;

  if (!language) {
    return res.status(400).json({
      status: 400,
      error: "Language is required"
    });
  }

  if (!vehicleId) {
    return res.status(400).json({
      status: 400,
      error: "VehicleId is required"
    });
  }

  try {
    // const vehicle = await getSingleVehicleAsync({ vehicleId });
    const vehicles = await advancedVehicleQuery({ vehicleId, language });

    return res.status(200).json({
      status: 200,
      result: vehicles
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err
    });
  }
};

export const addVehicle = async (req, res) => {
  try {
    //TODO
    const result = await addVehicleAsync({});

    return res.status(200).json({
      status: 200,
      data: {
        result
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

export const updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    //TODO
    await updateVehicleAsync({
      vehicleId,
      fieldToUpdate: { vehicleStatus: UNAVAILABLE } //TODO: fields
    });

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Update Successfully!"
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

export const removeVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    await updateVehicleAsync({
      vehicleId,
      fieldToUpdate: { vehicleStatus: UNAVAILABLE }
    });
    //dev only: await removeVehicleAsync({ vehicleId })

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Disable Successfully!"
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
