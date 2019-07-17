"use strict";

import RentalCompany from "../../models/rentalCompany";

export const getRentalCompaniesAsync = () => {
  return RentalCompany.find();
};

export const createRentalCompanyAsync = ({
  name,
  address,
  image,
  rating,
  perks,
  locationAlias
}) => {
  const newRentalCompany = new RentalCompany({
    name,
    address,
    image,
    rating,
    perks,
    locationAlias
  });

  return newRentalCompany.save();
};
