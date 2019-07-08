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

const createUser = ({}) => {};

const editUser = ({ userId, fieldToUpdate }) => {};

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

export { fetchUsers, fetchSingleUser, createUser, editUser, suspendUser };
