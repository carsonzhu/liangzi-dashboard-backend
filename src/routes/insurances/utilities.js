"use strict";

import InsuranceModel from "../../models/insurance";
import InsuranceCreator from "../../models/insuranceCreator";

export const getInsurancesAsync = ({ adminId, isSuper = false }) => {
  if (isSuper) {
    return InsuranceModel.find();
  } else {
    return new Promise((resolve, reject) => {
      InsuranceCreator.find({ adminId })
        .then(insuranceCreators => {
          if (!insuranceCreators || !insuranceCreators.length) {
            return reject({
              status: 400,
              msg: "This admin hasnt created any insurance with that id"
            });
          }

          const ids = insuranceCreators.map(insuranceCreator => {
            return new ObjectId(insuranceCreator.insuranceId);
          });

          return InsuranceModel.find()
            .where("_id")
            .in(ids)
            .exec();
        })
        .then(resolve)
        .catch(reject);
    });
  }
};

export const createInsuranceAsync = async ({
  adminId,
  rentalCompanyId,
  rentalCompanyName,
  name,
  description,
  dailyRate,
  dailyRateUnit
}) => {
  const insuranceInputs = {
    rentalCompanyId,
    rentalCompanyName,
    name,
    description,
    dailyRate,
    dailyRateUnit
  };

  let query = { name, rentalCompanyId },
    update = insuranceInputs,
    options = { upsert: true, new: true };

  //   const newInsuranceInstance = new InsuranceModel({
  //     rentalCompanyId,
  //     rentalCompanyName,
  //     name,
  //     description,
  //     dailyRate,
  //     dailyRateUnit
  //   });
  //  const newInsurance = await newInsuranceInstance.save()
  const newInsurance = await InsuranceModel.findOneAndUpdate(
    query,
    update,
    options
  );

  const newInsuranceCreatorInstance = new InsuranceCreator({
    adminId,
    insuranceId: newInsurance._id
  });
  await newInsuranceCreatorInstance.save();

  return Promise.resolve(newInsurance);
};

export const editInsuranceAsync = ({ adminId, insuranceId, fieldToUpdate }) => {
  return new Promise((resolve, reject) => {
    InsuranceCreator.findOne({ adminId, insuranceId })
      .then(insuranceCreator => {
        if (!insuranceCreator) {
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
export const removeInsuranceAsync = ({ adminId, insuranceId }) => {
  return new Promise((resolve, reject) => {
    InsuranceCreator.findOne({ adminId, insuranceId })
      .then(insuranceCreator => {
        if (!insuranceCreator) {
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
export const getInsuranceCreatorAsync = () => {
  return InsuranceCreator.find();
};
