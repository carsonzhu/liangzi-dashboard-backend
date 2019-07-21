"use strict";

import logger from "../../utilities/logger";

import { SUPER_ADMIN } from "../../utilities/constants";

import {
  createInsuranceAsync,
  getInsurancesAsync,
  editInsuranceAsync,
  removeInsuranceAsync,
  getInsuranceCreatorAsync
} from "./utilities";

export const getInsurances = async (req, res) => {
  try {
    const adminId = req.userId;
    const userType = req.userType;
    const rentalCompanyId = req.rentalCompanyId;

    const insurances = await getInsurancesAsync({
      adminId,
      isSuper: userType === SUPER_ADMIN,
      rentalCompanyId
    });

    return res.status(200).json({
      status: 200,
      data: {
        insurances
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

export const createInsurance = async (req, res) => {
  try {
    const adminId = req.userId;

    const {
      rentalCompanyId,
      rentalCompanyName,
      name,
      description,
      dailyRate,
      dailyRateUnit
    } = req.body;

    if (
      !adminId ||
      !rentalCompanyId ||
      !rentalCompanyName ||
      !name ||
      !description ||
      !dailyRate ||
      !dailyRateUnit
    ) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const newInsurance = await createInsuranceAsync({
      adminId,
      rentalCompanyId,
      rentalCompanyName,
      name,
      description,
      dailyRate,
      dailyRateUnit
    });

    return res.status(200).json({
      status: 200,
      data: {
        newInsurance
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

export const editInsurance = async (req, res) => {
  try {
    const adminId = req.userId;
    const userType = req.userType;
    const rentalCompanyId = req.rentalCompanyId;

    const { insuranceId, fieldToUpdate } = req.body;

    if (!adminId || !insuranceId || !fieldToUpdate) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    const insuranceFields = [
      "rentalCompanyId",
      "rentalCompanyName",
      "name",
      "description",
      "dailyRate",
      "dailyRateUnit"
    ];

    for (let key in fieldToUpdate) {
      if (!insuranceFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    await editInsuranceAsync({
      adminId,
      insuranceId,
      fieldToUpdate,
      isSuper: userType === SUPER_ADMIN,
      rentalCompanyId
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

export const removeInsurance = async (req, res) => {
  try {
    const adminId = req.userId;
    const userType = req.userType;

    const { insuranceId } = req.body;

    if (!adminId || !insuranceId) {
      return res.status(400).json({
        status: 400,
        description: "missing requried fields"
      });
    }

    await removeInsuranceAsync({
      adminId,
      insuranceId,
      isSuper: userType === SUPER_ADMIN,
      rentalCompanyId
    });

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Delete Successfully!"
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
