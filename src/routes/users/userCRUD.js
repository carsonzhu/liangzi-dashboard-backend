"use strict";

import UserModel from "../../models/users";
import logger from "../../utilities/logger";

const createUser = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

const fetchUser = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

const editUser = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

const removeUser = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal Error"
    });
  }
};

export { createUser, fetchUser, editUser, removeUser };
