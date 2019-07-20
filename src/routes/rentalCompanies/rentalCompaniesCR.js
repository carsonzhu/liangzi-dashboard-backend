"use strict";

import logger from "../../utilities/logger";

import { getRentalCompaniesAsync, createRentalCompanyAsync } from "./utilities";
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
    const { name, address, image, rating, perks, locationAlias } = req.body;

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
      locationAlias
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
