"use strict";

import LocationModel from "../../models/location";

export const getLocationsAsync = () => {
  return LocationModel.find();
};

export const createLocationAsycn = ({
  rentalCompanyId,
  rentalCompanyName,
  alias,
  address,
  hours,
  timezone
}) => {
  return Promise.resolve();
};
