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

    const { vehicleId, fieldToUpdate, isSuper = false } = req.body;

    if (!newVehicleId || !fieldToUpdate) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const vehicleFields = [
      "dailyRateDisplay",
      "dailyRate",
      "dailyRateUnit",
      "pickupLocationAddresses",
      "returnLocationAddresses",
      "transmission",
      "vehicleType",
      "trunkSize",
      "seats",
      "rentalCompanyId",
      "vehicleMake",
      "vehicleNotes",
      "insuranceIds",
      "vehicleStatus"
    ];

    for (let key in fieldToUpdate) {
      if (vehicleFields.indexOf(key) === -1) {
        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    await updateNewVehicleAsync({ adminId, vehicleId, fieldToUpdate, isSuper });

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

export const deleteNewVehicle = async (req, res) => {
  try {
    const adminId = req.userId;

    const { vehicleId, isSuper = false } = req.body;

    await updateNewVehicleAsync({
      adminId,
      isSuper,
      vehicleId,
      fieldToUpdate: { vehicleStatus: UNAVAILABLE }
    });
    // await deleteNewVehicleAsync({vehicleId})

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
