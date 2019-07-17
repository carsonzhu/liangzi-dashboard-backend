"use strict";

import logger from "../../utilities/logger";

import { getLocationsAsync, createLocationAsync } from "./utilities";

export const getLocations = async (req, res) => {
  try {
    const locations = await getLocationsAsync();

    return res.status(200).json({
      status: 200,
      data: {
        locations
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

export const createLocation = async (req, res) => {
  try {
    const {
      rentalCompanyId,
      rentalCompanyName,
      alias,
      address,
      hours,
      timezone
    } = req.body;

    if (
      !rentalCompanyId ||
      !rentalCompanyName ||
      !alias ||
      !address ||
      !hours ||
      !timezone
    ) {
      return res.status(400).json({
        status: 400,
        description: "missing required fields"
      });
    }

    const newLocation = await createLocationAsync({
      rentalCompanyId,
      rentalCompanyName,
      alias,
      address,
      hours,
      timezone
    });

    return res.status(200).json({
      status: 200,
      data: {
        newLocation
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
