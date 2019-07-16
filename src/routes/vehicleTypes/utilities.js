import VehicleType from "../../models/vehicleType";

const SELECTED_FIELDS = {};

export const getVehicleTypesAsync = () => {
  return VehicleType.find();
};

export const createVehicleTypeAsync = ({}) => {
  return Promise.resolve();
};
