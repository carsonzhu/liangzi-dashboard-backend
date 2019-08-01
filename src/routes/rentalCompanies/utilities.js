"use strict";

import RentalCompany from "../../models/rentalCompany";

import { AVAILABLE, UNAVAILABLE } from "../../utilities/constants";

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
    locationAlias,
    rentalCompanyStatus: AVAILABLE
  });

  return newRentalCompany.save();
};

export const editRentalCompanyAsync = ({
  isSuper,
  rentalCompanyId,
  fieldToUpdate
}) => {
  if (isSuper) {
    return RentalCompany.updateOne({ _id: rentalCompanyId }, fieldToUpdate);
  }

  return RentalCompany.find({ _id: rentalCompanyId });
};

export const deleteRentalCompanyAsync = ({ rentalCompanyId }) => {
  return RentalCompany.deleteOne({ _id: rentalCompanyId });
};
