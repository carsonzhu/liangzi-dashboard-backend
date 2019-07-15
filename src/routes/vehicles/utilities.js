import VehicleModel from "../../models/vehicle";
import VehicleCreator from "../../models/vehicleCreator";
import VehicleType from "../../models/vehicleType";
import LocationModel from "../../models/location";
import RentalCompanyModel from "../../models/rentalCompany";
import InsuranceModel from "../../models/insurance";

import {
  vehicleTypeFields,
  rentalCompanyFields,
  locationFields,
  insuranceFields,
  vehicleDataTransform
} from "./helper";

const SELECTED_FIELDS = {};

export const getVehiclesAsync = () => {
  const vehiclePromise = VehicleModel.find();
  const vehicleTypePromise = VehicleType.find();
  //TODO: locations & rental company & insurance

  return new Promise((resolve, reject) => {
    Promise.all([vehiclePromise, vehicleCreatorPromise, vehicleTypePromise])
      .then(([vehicles, vehicleCreators, vehicleTypes]) => {
        if (!vehicles || !vehicles.length) {
          return reject({ err: "No vehicle found" });
        }

        // const result = vehicles.map(vehicle => {
        //     vehicle.
        // })

        return resolve({ result: { vehicles, vehicleCreators, vehicleTypes } });
      })
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

export const addVehicleAsync = ({}) => {};

export const updateVehicleAsync = ({ vehicleId, fieldToUpdate }) => {
  return new Promise((resolve, reject) => {
    VehicleModel.findOne({ _id: vehicleId })
      .then(vehicle => {
        if (!vehicle) {
          return reject({ status: 400, msg: "invalid vehicleId" });
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
