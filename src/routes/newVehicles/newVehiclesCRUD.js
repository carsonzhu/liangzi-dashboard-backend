"use strict";

import logger from "../../utilities/logger";

import {
  getNewVehiclesAsync,
  createNewVehicleAsync,
  updateNewVehicleAsync,
  deleteNewVehicleAsync
} from "./utilities";

export const getNewVehicles = async (req, res) => {
  try {
    const adminId = req.userId;
    const { isSuper = false } = req.body;

    const vehicles = await getNewVehiclesAsync({ adminId, isSuper });

    return res.status(200).json({
      status: 200,
      data: {
        vehicles
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

export const createNewVehicle = async (req, res) => {
  try {
    const adminId = req.userId;

    const {
      dailyRate,
      dailyRateUnit,
      pickupLocationAddresses,
      returnLocationAddresses,
      specialServices,
      transmission,
      vehicleType,
      trunkSize,
      seats,
      rentalCompanyId,
      vehicleMake,
      vehicleImage,
      vehicleNotes,
      insuranceIds
    } = req.body;

    if (
      !dailyRate ||
      !dailyRateUnit ||
      !pickupLocationAddresses ||
      !returnLocationAddresses ||
      !specialServices ||
      !transmission ||
      !vehicleType ||
      !trunkSize ||
      !seats ||
      !rentalCompanyId ||
      !vehicleMake ||
      !vehicleImage ||
      !vehicleNotes ||
      !insuranceIds
    ) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const newVehicle = await createNewVehicleAsync({
      adminId,
      dailyRate,
      dailyRateUnit,
      pickupLocationAddresses,
      returnLocationAddresses,
      specialServices,
      transmission,
      vehicleType,
      trunkSize,
      seats,
      rentalCompanyId,
      vehicleMake,
      vehicleImage,
      vehicleNotes,
      insuranceIds
    });

    return res.status(200).json({
      status: 200,
      data: {
        newVehicle
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

export const updateNewVehicle = async (req, res) => {
  try {
    const adminId = req.userId;

    const { newVehicleId, fieldToUpdate } = req.body;

    if (!newVehicleId || !fieldToUpdate) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }
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

export const deleteNewVehicle = async (req, res) => {
  try {
    const adminId = req.userId;

    const { newVehicleId } = req.body;
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
