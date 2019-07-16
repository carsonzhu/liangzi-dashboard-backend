"use strict";

import LocationModel from "../../models/location";

export const getLocationsAsync = () => {
  return LocationModel.find();
};

export const createLocationAsync = ({
  rentalCompanyId,
  rentalCompanyName,
  alias,
  address,
  hours,
  timezone
}) => {
  const newLocation = new LocationModel({
    rentalCompanyId,
    rentalCompanyName,
    alias,
    address,
    hours,
    timezone
  });

  return newLocation.save();
};
