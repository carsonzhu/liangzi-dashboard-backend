"use strict";

import logger from "../utilities/logger";

const authenticationForLocalTesting = (req, res, next) => {
  let userId = "c86b79ca-b0e8-441e-97a3-724998ca9460";
  req.userId = userId;
  logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
  next();
};

export { authenticationForLocalTesting };
