"use strict";

import logger from "../utilities/logger";
import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  try {
    /*************
     * Skip validating
     **************/
    if (req.path.startsWith("/apis/authentication")) {
      logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
      return next();
    }

    /*************
     * Validate token
     **************/
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({
        status: 401,
        description: "Missing authorization token"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({
            status: 401,
            description: "Expired authorization token"
          });
        }

        return res.status(401).send({
          status: 401,
          description: "Invalid authorization token"
        });
      }

      req.userId = decoded.userId;
      req.userType = decoded.userType;
      req.rentalCompanyId = decoded.rentalCompanyId;
      logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
      return next();
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      status: 500,
      description: "Internal error"
    });
  }
};

const authenticationForLocalTesting = (req, res, next) => {
  req.userId = "5d2e74e59f6032efbe55c250";
  req.userType = "normalAdmin";
  req.rentalCompanyId = "5d4271f02110d30071476b15";
  logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
  next();
};

export { authentication, authenticationForLocalTesting };
