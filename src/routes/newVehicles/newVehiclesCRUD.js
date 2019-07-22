"use strict";

import logger from "../../utilities/logger";

import { SUPER_ADMIN } from "../../utilities/constants";

import {
  getNewVehiclesAsync,
  createNewVehicleAsync,
  updateNewVehicleAsync,
  deleteNewVehicleAsync
} from "./utilities";

export const getNewVehicles = async (req, res) => {
  try {
    const adminId = req.userId;
    const userType = req.userType;
    const rentalCompanyId = req.rentalCompanyId;

    const vehicles = await getNewVehiclesAsync({
      adminId,
      rentalCompanyId,
      isSuper: userType === SUPER_ADMIN
    });

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
      locationAddress,
      locationHours,
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
      !locationAddress ||
      !locationHours ||
      !transmission ||
      !vehicleType ||
      !trunkSize ||
      !seats ||
      !rentalCompanyId ||
      !vehicleMake ||
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
      locationAddress,
      locationHours,
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
    const userType = req.userType;

    const { vehicleId, fieldToUpdate } = req.body;

    if (!vehicleId || !fieldToUpdate) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const vehicleFields = [
      "dailyRateDisplay",
      "dailyRate",
      "dailyRateUnit",
      "locationAddress",
      "locationHours",
      "transmission",
      "specialServices",
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
        logger.error("vehicleFields error", key);

        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    await updateNewVehicleAsync({
      adminId,
      vehicleId,
      fieldToUpdate,
      isSuper: userType === SUPER_ADMIN
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

export const deleteNewVehicle = async (req, res) => {
  try {
    const adminId = req.userId;
    const userType = req.userType;

    const { vehicleId } = req.body;

    await updateNewVehicleAsync({
      adminId,
      isSuper: userType === SUPER_ADMIN,
      vehicleId,
      fieldToUpdate: { vehicleStatus: UNAVAILABLE }
    });
    // dev only: await deleteNewVehicleAsync({ vehicleId });

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
