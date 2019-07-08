"use strict";

import logger from "../../utilities/logger";

import { suspendUser, fetchSingleUser, fetchUsers } from "./utilities";

const getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (userId) {
      const singleUser = await fetchSingleUser({ userId });

      return res.status(200).json({
        status: 200,
        data: {
          singleUser
        }
      });
    } else {
      const users = await fetchUsers();

      return res.status(200).json({
        status: 200,
        data: {
          users
        }
      });
    }
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
    const userId = req.userId;

    const removedUser = await suspendUser({ userId });

    return res.status(200).json({
      status: 200,
      data: {
        removedUser
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

export { createUser, getUsers, editUser, removeUser };
