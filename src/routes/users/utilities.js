"use strict";

import UserModel from "../../models/users";
import { SUSPENDED } from "../../utilities/constants";

const fetchUsersFunc = () => {
  return UserModel.find().select({
    _id: 1,
    email: 1,
    username: 1,
    userType: 1,
    allowedOperations: 1,
    isActive: 1
  });
};

const fetchSingleUserFunc = ({ userId }) => {
  return new Promise((resolve: 1, reject) => {
    UserModel.findOne({ _id: userId })
      .select({
        _id: 1,
        email: 1,
        username: 1,
        userType: 1,
        allowedOperations: 1,
        isActive: 1
      })
      .then(singleUser => {
        if (singleUser) {
          return resolve(singleUser);
        } else {
          return reject({ status: 400, msg: "invalid userId" });
        }
      })
      .catch(err);
  });
};

const addUserFunc = ({
  email = "",
  password = "",
  userType = "",
  username = "",
  allowedOperations = [],
  isActive = ""
}) => {
  if (!email || !password || !userType || !isActive || !username) {
    return Promise.reject({ status: 400, msg: "missing fields" });
  }

  const newUser = new UserModel({
    email,
    password,
    userType,
    username,
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
          return reject({ status: 400, msg: "invalid userId" });
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
