"use strict";

import logger from "../../utilities/logger";

import {
  createInsuranceAsync,
  getInsurancesAsync,
  editInsuranceAsync,
  removeInsuranceAsync
} from "./utilities";

export const getInsurances = async (req, res) => {
  try {
    const insurances = await getInsurancesAsync();

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
    const {} = req.body;
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
    const {} = req.body;
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
    const {} = req.body;
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
