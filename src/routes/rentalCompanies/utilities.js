"use strict";

import RentalCompany from "../../models/rentalCompany";

export const getRentalCompaniesAsync = ({ isSuper, rentalCompanyId }) => {
  if (isSuper) {
    return RentalCompany.find();
  }

  return RentalCompany.find({ _id: rentalCompanyId });
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

export const deleteRentalCompanyAsync = ({ rentalCompanyId }) => {
  return RentalCompany.deleteOne({ _id: rentalCompanyId });
};
