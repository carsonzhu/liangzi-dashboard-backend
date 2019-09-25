"use strict";

import NewVehicleModel from "../../models/newVehicle";
import base64 from "file-base64";
import { AVAILABLE, AUTOMATIC } from "../../utilities/constants";
import logger from "../../utilities/logger";

export const getNewVehiclesAsync = ({ isSuper = false, rentalCompanyId }) => {
  if (isSuper) {
    return NewVehicleModel.find();
  } else {
    return NewVehicleModel.find({ rentalCompanyId });
  }
};

export const updateNewVehicleImageAsync = async ({
  vehicleId,
  file,
  rentalCompanyId,
  isSuper = false
}) => {
  let buff = new Buffer(file.buffer)
  let imageStr = buff.toString('base64');
  if (isSuper) {
    let updatedVehicle = await NewVehicleModel.findOneAndUpdate(
      { _id: vehicleId },
      {
        vehicleImageStr: imageStr
      },
      { new: true }
    );
    return updatedVehicle;
  } else {
    let updatedVehicle = await NewVehicleModel.findOneAndUpdate(
      { _id: vehicleId, rentalCompanyId: rentalCompanyId },
      {
        vehicleImageStr: imageStr
      },
      { new: true }
    );
    return updatedVehicle;
  }
};

export const createNewVehicleAsync = async ({
  dailyRate = 0,
  dailyRateUnit = "CAD",
  locationAddress = "",
  locationHours = {},
  specialServices = {},
  transmission = AUTOMATIC,
  vehicleType = "",
  trunkSize = 0,
  seats = 0,
  rentalCompanyId = "",
  vehicleMake = {},
  vehicleNotes = {},
  insuranceIds = [""]
}) => {
  const NewVehicleInput = new NewVehicleModel({
    dailyRateDisplay: dailyRate,
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
    vehicleImage: "",
    vehicleImageStr: "",
    vehicleNotes,
    insuranceIds,
    vehicleStatus: AVAILABLE
  });

  return NewVehicleInput.save();
};

export const updateNewVehicleAsync = ({
  rentalCompanyId,
  vehicleId,
  fieldToUpdate,
  isSuper = false
}) => {
  if (isSuper) {
    return NewVehicleModel.updateOne({ _id: vehicleId }, fieldToUpdate);
  } else {
    return new Promise((resolve, reject) => {
      NewVehicleModel.findOne({ rentalCompanyId, _id: vehicleId })
        .then(vehicle => {
          if (!vehicle) {
            return reject({
              status: 400,
              msg: "This admin hasnt created any vehicle with that id"
            });
          }

          // Display rate (what users see) and rate (what company descides)
          // 1) Display rate is for superAdmin only and
          // 2) If rate is being updated, then the display rate is also being updated
          // with the same ratio

          if (vehicle.dailyRate !== fieldToUpdate.dailyRate) {
            const ratio = fieldToUpdate.dailyRate / vehicle.dailyRate;

            fieldToUpdate.dailyRateDisplay = vehicle.dailyRateDisplay * ratio;
          }

          return NewVehicleModel.updateOne({ _id: vehicleId }, fieldToUpdate);
        })
        .then(resolve)
        .catch(reject);
    });
  }
};

//DEV: For data cleanup only
export const deleteNewVehicleAsync = ({ vehicleId }) => {
  return NewVehicleModel.deleteOne({ _id: vehicleId });
};
