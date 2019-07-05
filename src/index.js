"use strict";

import express from "express";
import bodyParser from "body-parser";
import _ from "./utilities/env";
import routes from "./routes/router";
import logger from "./utilities/logger";
import {
  authentication,
  authenticationForLocalTesting
} from "./middlewares/authentication";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(authentication);

app.use(routes);

app.listen(process.env.PORT, (error, server) => {
  if (error) {
    logger.error({ err }, "Failed to start server");
  } else {
    logger.info(`Started server on ${process.env.PORT}`);
  }
});

export default app;
