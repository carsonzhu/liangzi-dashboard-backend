import VehicleType from "../../models/vehicleType";

export const getVehicleTypesAsync = () => {
  return VehicleType.find();
};

export const createVehicleTypeAsync = ({
  type = "",
  trunkSize = 0,
  seats = 0
}) => {
  const newVehicleType = new VehicleType({
    type,
    trunkSize,
    seats
  });

  return newVehicleType.save();
};
