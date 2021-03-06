"use strict";

import logger from "../../utilities/logger";
import UserModel from "../../models/admin";

import {
  fetchSingleUserFunc,
  fetchUsersFunc,
  addUserFunc,
  updateUserFunc,
  deleteUserFunc
} from "./utilities";

const getUsers = async (req, res) => {
  try {
    const dataTransform = data => {
      data.forEach(user => {
        user["userId"] = user._id;

        delete user._id;
      });

      return data;
    };

    const users = await fetchUsersFunc();

    return res.status(200).json({
      status: 200,
      data: {
        users: dataTransform(users)
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

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const singleUser = await fetchSingleUserFunc({ _id: userId });

    return res.status(200).json({
      status: 200,
      data: {
        singleUser
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

const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      userType,
      username,
      allowedOperations,
      rentalCompanyId
    } = req.body;

    if (!email || !password || !userType || !username || !rentalCompanyId) {
      return res.status(400).json({
        status: 400,
        description: "missing fields"
      });
    }

    // Check if email exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        description: "Email exists"
      });
    }

    const newUser = await addUserFunc({
      email,
      password,
      userType,
      username,
      allowedOperations,
      rentalCompanyId
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
      "userType",
      "username",
      "allowedOperations",
      "isActive",
      "rentalCompanyId"
    ];

    for (let key in fieldToUpdate) {
      if (userFields.indexOf(key) === -1) {
        logger.error("userFields error", key);

        return res.status(400).json({
          status: 400,
          description: "invalid/ non-existing field(s)"
        });
      }
    }

    await updateUserFunc({ userId, fieldToUpdate });

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

const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await updateUserFunc({ userId, fieldToUpdate: { isActive: false } });
    //dev only: await deleteUserFunc({userId})

    return res.status(200).json({
      status: 200,
      data: {
        msg: "Disable Successfully!"
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

export { createUser, getUsers, getSingleUser, editUser, removeUser };
