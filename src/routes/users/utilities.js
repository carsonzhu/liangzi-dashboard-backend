"use strict";

import UserModel from "../../models/user";
import { SUSPENDED } from "../../utilities/constants";

const fetchUsers = () => {
  return UserModel.find();
};

const fetchSingleUser = ({ userId }) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ _id: userId })
      .then(singleUser => {
        if (singleUser) {
          resolve(singleUser);
        } else {
          reject({ status: 400, msg: "invalid userId" });
        }
      })
      .catch(err);
  });
};

const addUser = ({
  email = "",
  password = "",
  userType = "",
  allowedOperations = [],
  isActive = ""
}) => {
  if (!email || !password || !userType || !isActive) {
    return Promise.reject({ status: 400, msg: "missing fields" });
  }

  const newUser = new UserModel({
    email,
    password,
    userType,
    allowedOperations,
    isActive
  });

  return new Promise((resolve, reject) => {
    newUser
      .generateHash(password)
      .then(hashedPassword => {
        newUser.password = hashedPassword;
        return newUser.save();
      })
      .then(resolve)
      .catch(reject);
  });
};

const updateUser = ({ userId, fieldToUpdate }) => {
  return new Promise((resolve, reject) => {
    UserModel.find({ userId })
      .then(user => {
        if (!user) {
          return reject({ status: 400, msg: "invalid userId" });
        }

        user = { ...user, ...fieldToUpdate };

        const updateduser = new UserModel(user);

        return updateduser.save();
      })
      .then(resolve)
      .catch(reject);
  });
};

const suspendUser = ({ userId }) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ userId })
      .then(userToSuspend => {
        if (userToSuspend) {
          userToSuspend.isActive = SUSPENDED;

          return impressionResult.save();
        } else {
          reject({ status: 400, msg: "invalid userId" });
        }
      })
      .then(resolve)
      .catch(reject);
  });
};

export { fetchUsers, fetchSingleUser, addUser, updateUser, suspendUser };
