"use strict";

import UserModel from "../../models/users";
import { SUSPENDED } from "../../utilities/constants";

const fetchUsersFunc = () => {
  return UserModel.find();
};

const fetchSingleUserFunc = ({ userId }) => {
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

const addUserFunc = ({
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

const updateUserFunc = ({ userId, fieldToUpdate }) => {
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

const suspendUserFunc = ({ userId }) => {
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

export {
  fetchUsersFunc,
  fetchSingleUserFunc,
  addUserFunc,
  updateUserFunc,
  suspendUserFunc
};
