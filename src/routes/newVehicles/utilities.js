"use strict";

import NewVehicleModel from "../../models/newVehicle";
import VehicleCreator from "../../models/vehicleCreator";

import mongoose from "mongoose";
import { AVAILABLE, AUTOMATIC } from "../../utilities/constants";
const ObjectId = mongoose.Types.ObjectId;

export const getNewVehiclesAsync = ({ adminId, isSuper = false }) => {
  if (isSuper) {
    return NewVehicleModel.find();
  } else {
    return new Promise((resolve, reject) => {
      VehicleCreator.find({ adminId })
        .then(vehicleCreators => {
          if (!vehicleCreators || !vehicleCreators.length) {
            return reject({
              status: 400,
              msg: "This admin hasnt created any vehicle with that id"
            });
          }

          const ids = vehicleCreators.map(vehicleCreator => {
            return new ObjectId(vehicleCreator.vehicleId);
          });

          return NewVehicleModel.find()
            .where("_id")
            .in(ids)
            .exec();
        })
        .then(resolve)
        .catch(reject);
    });
  }
};

export const createNewVehicleAsync = async ({
  adminId,
  dailyRate = 0,
  dailyRateUnit = "CAD",
  pickupLocationAddresses = [""],
  returnLocationAddresses = [""],
  specialServices = {},
  transmission = AUTOMATIC,
  vehicleType = "",
  trunkSize = 0,
  seats = 0,
  rentalCompanyId = "",
  vehicleMake = {},
  vehicleImage = "",
  vehicleNotes = {},
  insuranceIds = [""]
}) => {
  const NewVehicleInput = new NewVehicleModel({
    dailyRateDisplay: dailyRate,
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
    insuranceIds,
    vehicleStatus: AVAILABLE
  });

  const newVehicleResult = await NewVehicleInput.save();

  const newVehicleCreator = new VehicleCreator({
    adminId,
    vehicleId: newVehicleResult._id
  });

  await newVehicleCreator.save();
  return Promise.resolve(newVehicleResult);
};

export const updateNewVehicleAsync = ({
  adminId,
  vehicleId,
  fieldToUpdate,
  isSuper = false
}) => {
  if (isSuper) {
    return NewVehicleModel.updateOne({ _id: vehicleId }, fieldToUpdate);
  } else {
    return new Promise((resolve, reject) => {
      VehicleCreator.findOne({ adminId, vehicleId })
        .then(vehicleCreator => {
          if (!vehicleCreator) {
            return reject({
              status: 400,
              msg: "This admin hasnt created any vehicle with that id"
            });
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
