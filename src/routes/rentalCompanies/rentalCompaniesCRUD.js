"use strict";

import logger from "../../utilities/logger";

import {
  getRentalCompaniesAsync,
  createRentalCompanyAsync,
  editRentalCompanyAsync,
  deleteRentalCompanyAsync
} from "./utilities";
import { SUPER_ADMIN } from "../../utilities/constants";

export const getRentalCompanies = async (req, res) => {
  try {
    const userType = req.userType;
    const rentalCompanyId = req.rentalCompanyId;

    const rentalCompanies = await getRentalCompaniesAsync({
      rentalCompanyId,
      isSuper: userType === SUPER_ADMIN
    });

    return res.status(200).json({
      status: 200,
      data: {
        rentalCompanies
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

export const createRentalCompany = async (req, res) => {
  try {
    const {
      name,
      address,
      image,
      rating,
      perks,
      locationAlias,
      companyRepName,
      companyPhoneNumber
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const newRentalCompany = await createRentalCompanyAsync({
      name,
      address,
      image,
      rating,
      perks,
      locationAlias,
      companyRepName,
      companyPhoneNumber
    });

    return res.status(200).json({
      status: 200,
      data: {
        newRentalCompany
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

export const editRentalCompany = async (req, res) => {
  try {
    const userType = req.userType;
    const userRentalCompanyId = req.rentalCompanyId;

    const { rentalCompanyId, fieldToUpdate } = req.body;

    if (userType !== SUPER_ADMIN && userRentalCompanyId !== rentalCompanyId) {
      return res.status(400).json({
        status: 400,
        description: "The user is not allowed to update this rental company."
      });
    }

    const rentalCompanyFields = [
      "name",
      "address",
      "image",
      "rating",
      "perks",
      "locationAlias",
      "rentalCompanyStatus",
      "companyRepName",
      "companyPhoneNumber"
    ];

    for (let key in fieldToUpdate) {
      if (rentalCompanyFields.indexOf(key) === -1) {
        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    await editRentalCompanyAsync({
      isSuper: userType === SUPER_ADMIN,
      rentalCompanyId,
      fieldToUpdate
    });

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Update Successfully!"
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

// DEV only: for data cleanup
export const deleteRentalCompany = async (req, res) => {
  try {
    const userType = req.userType;
    const userRentalCompanyId = req.rentalCompanyId;

    const { rentalCompanyId } = req.body;

    if (userType !== SUPER_ADMIN && userRentalCompanyId !== rentalCompanyId) {
      return res.status(400).json({
        status: 400,
        description: "The user is not allowed to update this rental company."
      });
    }

    await editRentalCompanyAsync({
      isSuper: userType === SUPER_ADMIN,
      rentalCompanyId,
      fieldToUpdate: { rentalCompanyStatus: UNAVAILABLE }
    });

    // Dev only
    // await deleteRentalCompanyAsync({ rentalCompanyId });

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Disable Successfully!"
      }
    });
  } catch (err) {
    logger.error(err);

    if (err.status === 400) {
      return res.status(400).json({
        status: 400,
        description: err.msg
      });
    }

    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};
