"use strict";

import UserModel from "../../models/admin";

const SELECTED_FIELDS = {
  _id: 1,
  email: 1,
  username: 1,
  userType: 1,
  allowedOperations: 1,
  isActive: 1
};

const fetchUsersFunc = () => {
  return UserModel.find().select(SELECTED_FIELDS);
};

const fetchSingleUserFunc = query => {
  return new Promise((resolve, reject) => {
    UserModel.findOne(query)
      .select(SELECTED_FIELDS)
      .then(singleUser => {
        if (singleUser) {
          return resolve(singleUser);
        } else {
          return reject({ status: 400, msg: "invalid userId" });
        }
      })
      .catch(reject);
  });
};

const addUserFunc = ({
  email = "",
  password = "",
  userType = "",
  username = "",
  allowedOperations = [],
  rentalCompanyId = ""
}) => {
  const newUser = new UserModel({
    email,
    password,
    userType,
    username,
    allowedOperations,
    isActive: true,
    rentalCompanyId
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
    UserModel.findOne({ _id: userId })
      .then(user => {
        if (!user) {
          return reject({ status: 400, msg: "invalid userId" });
        }

        return UserModel.updateOne({ _id: userId }, fieldToUpdate);
      })
      .then(resolve)
      .catch(reject);
  });
};

// For data cleanup only
const deleteUserFunc = ({ userId }) => {
  return UserModel.deleteOne({ _id: userId });
};

export {
  fetchUsersFunc,
  fetchSingleUserFunc,
  addUserFunc,
  updateUserFunc,
  deleteUserFunc
};
