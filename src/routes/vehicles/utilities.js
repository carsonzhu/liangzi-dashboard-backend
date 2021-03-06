"use strict";

import VehicleModel from "../../models/vehicle";
import VehicleCreator from "../../models/vehicleCreator";
import VehicleType from "../../models/vehicleType";
import LocationModel from "../../models/location";
import RentalCompanyModel from "../../models/rentalCompany";
import InsuranceModel from "../../models/insurance";
import InsuranceCreator from "../../models/insuranceCreator";

import * as locale from "../../locale/locale";
import localeClass from "../../locale/localeClass";

import {
  vehicleTypeFields,
  rentalCompanyFields,
  locationFields,
  insuranceFields,
  vehicleDataTransform
} from "./helper";

import mongoose from "mongoose";
import { AVAILABLE, AUTOMATIC } from "../../utilities/constants";
const ObjectId = mongoose.Types.ObjectId;

// TODO: filtering based on adminId
export const getVehiclesAsync = ({ adminId, isSuper }) => {
  const vehiclePromise = VehicleModel.find();
  const vehicleTypePromise = VehicleType.find();
  const locationPromise = LocationModel.find();
  const rentalCompanyPromise = RentalCompanyModel.find();
  const insurancePromise = InsuranceModel.find();
  const vehicleCreatorPromise = VehicleCreator.find();
  const insuranceCreatorPromise = InsuranceCreator.find();

  return new Promise((resolve, reject) => {
    Promise.all([
      vehiclePromise,
      vehicleTypePromise,
      locationPromise,
      rentalCompanyPromise,
      insurancePromise,
      vehicleCreatorPromise,
      insuranceCreatorPromise
    ])
      .then(
        ([
          vehicles,
          vehicleTypes,
          locations,
          rentalCompanys,
          insurances,
          vehicleCreators,
          insuranceCreators
        ]) => {
          return resolve({
            vehicles,
            vehicleTypes,
            locations,
            rentalCompanys,
            insurances,
            vehicleCreators,
            insuranceCreators
          });
        }
      )
      .catch(reject);
  });
};

export const getSingleVehicleAsync = async ({ vehicleId }) => {
  try {
    const vehicle = await VehicleModel.findOne({ _id: vehicleId });

    const {
      // data for more queries
      vehicleTypeId,
      rentalCompanyId,
      pickupLocationIds,
      returnLocationIds,
      insuranceIds
    } = vehicle;

    const vehicleTypePromise = VehicleType.findOne({
      _id: vehicleTypeId
    }).select(vehicleTypeFields);
    const rentalCompanyPromise = RentalCompanyModel.findOne({
      _id: rentalCompanyId
    }).select(rentalCompanyFields);
    const pickupPromise = LocationModel.findOne({
      _id: { $in: pickupLocationIds }
    }).select(locationFields);
    const returnPromise = LocationModel.findOne({
      _id: { $in: returnLocationIds }
    }).select(locationFields);
    const insurancePromise = InsuranceModel.findOne({
      _id: { $in: insuranceIds }
    }).select(insuranceFields);

    const [
      vehicleType,
      rentalCompany,
      pickupLocation,
      returnLocation,
      insurance
    ] = await Promise.all([
      vehicleTypePromise,
      rentalCompanyPromise,
      pickupPromise,
      returnPromise,
      insurancePromise
    ]);

    return vehicleDataTransform({
      vehicle,
      vehicleType,
      rentalCompany,
      pickupLocation,
      returnLocation,
      insurance
    });
  } catch (err) {
    return { err };
  }
};

export const addVehicleAsync = async ({
  adminId,
  dailyRate = 0,
  dailyRateUnit = "CAD",
  pickupLocationIds = [""],
  returnLocationIds = [""],
  specialServices = {},
  transmission = AUTOMATIC,
  vehicleTypeId = "",
  rentalCompanyId = "",
  vehicleMake = {},
  vehicleImage = "",
  vehicleNotes = {},
  insuranceIds = [""]
}) => {
  const vehicleInputs = {
    dailyRateDisplay: dailyRate,
    dailyRate,
    dailyRateUnit,
    pickupLocationIds,
    returnLocationIds,
    specialServices,
    transmission,
    vehicleTypeId,
    rentalCompanyId,
    vehicleMake,
    vehicleImage,
    vehicleNotes,
    insuranceIds,
    vehicleStatus: AVAILABLE
  };

  let query = {
      vehicleTypeId: vehicleTypeId,
      rentalCompanyId: rentalCompanyId
    },
    update = vehicleInputs,
    options = { upsert: true, new: true };

  //TODO: (optional) aws s3
  const newVehicle = await VehicleModel.findOneAndUpdate(
    query,
    update,
    options
  );

  const newVehicleCreator = new VehicleCreator({
    adminId,
    vehicleId: newVehicle._id
  });

  await newVehicleCreator.save();
  return Promise.resolve(newVehicle);
};

export const updateVehicleAsync = ({
  adminId,
  vehicleId,
  fieldToUpdate,
  isSuper = true
}) => {
  if (isSuper) {
    return VehicleModel.updateOne({ _id: vehicleId }, fieldToUpdate);
  }

  return new Promise((resolve, reject) => {
    VehicleCreator.findOne({ adminId, vehicleId })
      .then(vehicleCreator => {
        if (!vehicleCreator) {
          return reject({
            status: 400,
            msg: "This admin hasnt created any vehicle with that id"
          });
        }

        return VehicleModel.updateOne({ _id: vehicleId }, fieldToUpdate);
      })
      .then(resolve)
      .catch(reject);
  });
};

//DEV: For data cleanup only
export const removeVehicleAsync = ({ vehicleId }) => {
  return VehicleModel.deleteOne({ _id: vehicleId });
};

// Jiamin's code
export const advancedVehicleQuery = ({ language, vehicleId }) => {
  return VehicleModel.aggregate([
    { $match: { _id: ObjectId(vehicleId) } },
    {
      $lookup: {
        localField: "vehicleTypeId",
        from: "vehicle_types",
        foreignField: "_id",
        as: "vehicleType"
      }
    },
    { $unwind: "$vehicleType" },
    {
      $lookup: {
        localField: "rentalCompanyId",
        from: "rental_companies",
        foreignField: "_id",
        as: "Company"
      }
    },
    {
      $lookup: {
        localField: "pickupLocationIds",
        from: "locations",
        foreignField: "_id",
        as: "pickupLocations"
      }
    },
    {
      $lookup: {
        localField: "returnLocationIds",
        from: "locations",
        foreignField: "_id",
        as: "returnLocations"
      }
    },
    {
      $lookup: {
        localField: "rentalCompanyId",
        from: "rental_companies",
        foreignField: "_id",
        as: "Company"
      }
    },
    { $unwind: "$Company" },
    {
      $lookup: {
        localField: "insuranceIds",
        from: "insurances",
        foreignField: "_id",
        as: "Insurances"
      }
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        seats: "$vehicleType.seats",
        image: "$vehicleImage",
        type: `$vehicleType.type.${language}`,
        transmission: "$transmission",
        trunkSize: "$vehicleType.trunkSize",
        vehicleMake: `$vehicleMake.${language}`,
        dailyRate: "$dailyRate",
        notes: `$vehicleNotes.${language}`,
        specialServices: "$specialServices",
        pickupLocations: {
          $map: {
            input: "$pickupLocations",
            as: "item",
            in: {
              id: "$$item._id",
              hours: `$$item.hours`,
              alias: "$$item.alias",
              address: `$$item.address.${language}`
            }
          }
        },
        returnLocations: {
          $map: {
            input: "$returnLocations",
            as: "item",
            in: {
              id: "$$item._id",
              hours: `$$item.hours`,
              alias: "$$item.alias",
              address: `$$item.address.${language}`
            }
          }
        },
        "Company:": {
          id: "$Company._id",
          name: `$Company.name.${language}`,
          image: "$Company.image",
          rating: "$Company.rating",
          perks: "$Company.perks",
          address: "$Company.address",
          locationAlias: "$Company.locationAlias"
        },
        ListingOption: {
          $map: {
            input: "$ListingOption",
            as: "item",
            in: {
              name: `$$item.name.${language}`,
              dailyRate: "$$item.dailyRate",
              description: `$$item.description.${language}`
            }
          }
        }
      }
    }
  ]);
};
