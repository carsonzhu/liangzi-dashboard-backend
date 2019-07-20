"use strict";

import InsuranceModel from "../../models/insurance";
import InsuranceCreator from "../../models/insuranceCreator";

export const getInsurancesAsync = ({
  rentalCompanyId = "",
  isSuper = false
}) => {
  if (isSuper) {
    return InsuranceModel.find();
  } else {
    return InsuranceModel.find({ rentalCompanyId });
  }
};

export const createInsuranceAsync = async ({
  rentalCompanyId,
  rentalCompanyName,
  name,
  description,
  dailyRate,
  dailyRateUnit
}) => {
  const newInsuranceInstance = new InsuranceModel({
    rentalCompanyId,
    rentalCompanyName,
    name,
    description,
    dailyRate,
    dailyRateUnit
  });

  return newInsuranceInstance.save();
};

export const editInsuranceAsync = ({
  adminId,
  insuranceId,
  fieldToUpdate,
  isSuper,
  rentalCompanyId
}) => {
  if (isSuper) {
    return InsuranceModel.updateOne({ _id: insuranceId }, fieldToUpdate);
  }

  return new Promise((resolve, reject) => {
    InsuranceModel.findOne({ rentalCompanyId, insuranceId })
      .then(insurance => {
        if (!insurance) {
          return reject({
            status: 400,
            msg: "This admin hasnt created any insurance with that id"
          });
        }

        return InsuranceModel.updateOne({ _id: insuranceId }, fieldToUpdate);
      })
      .then(resolve)
      .catch(reject);
  });
};

// Dev only
export const removeInsuranceAsync = ({
  adminId,
  insuranceId,
  isSuper,
  rentalCompanyId
}) => {
  if (isSuper) {
    return InsuranceModel.deleteOne({ _id: insuranceId });
  }

  return new Promise((resolve, reject) => {
    InsuranceModel.findOne({ rentalCompanyId, insuranceId })
      .then(insurance => {
        if (!insurance) {
          return reject({
            status: 400,
            msg: "This admin hasnt created any insurance with that id"
          });
        }

        return InsuranceModel.deleteOne({ _id: insuranceId });
      })
      .then(resolve)
      .catch(reject);
  });
};

//Dev only
// export const getInsuranceCreatorAsync = () => {
//   return InsuranceCreator.find();
// };
