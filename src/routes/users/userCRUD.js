"use strict";

import logger from "../../utilities/logger";

import {
  suspendUserFunc,
  fetchSingleUserFunc,
  fetchUsersFunc,
  addUserFunc,
  updateUserFunc
} from "./utilities";

const getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (userId) {
      const singleUser = await fetchSingleUserFunc({ userId });

      return res.status(200).json({
        status: 200,
        data: {
          singleUser
        }
      });
    } else {
      const users = await fetchUsersFunc();

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
    const {
      email,
      password,
      userType,
      username,
      allowedOperations,
      isActive
    } = req.body;

    const newUser = await addUserFunc({
      email,
      password,
      userType,
      username,
      allowedOperations,
      isActive
    });

    return res.status(200).json({
      status: 200,
      data: {
        newUser
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

const editUser = async (req, res) => {
  try {
    const { userId, fieldToUpdate } = req.body;

    if (!userId || !fieldToUpdate) {
      return res.status(400).json({
        status: 400,
        description: "missing userId/ fieldToUpdate"
      });
    }

    const userFields = [
      "email",
      "password",
      "userType",
      "username",
      "allowedOperations",
      "isActive"
    ];

    for (key in fieldToUpdate) {
      if (userFields.indexOf(userFields) === -1) {
        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    const updatedUser = await updateUserFunc({ userId, fieldToUpdate });

    return res.status(200).json({
      status: 200,
      data: {
        updatedUser
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

const removeUser = async (req, res) => {
  try {
    const userId = req.userId;

    const removedUser = await suspendUserFunc({ userId });

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
