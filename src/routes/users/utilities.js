"use strict";

import UserModel from "../../models/users";

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

const fetchSingleUserFunc = query => {
  return new Promise((resolve, reject) => {
    UserModel.findOne(query)
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
      .catch(reject);
  });
};

const addUserFunc = ({
  email = "",
  password = "",
  userType = "",
  username = "",
  allowedOperations = []
}) => {
  const newUser = new UserModel({
    email,
    password,
    userType,
    username,
    allowedOperations,
    isActive: true
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

        return UserModel.update({ _id: userId }, fieldToUpdate);
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
          userToSuspend.isActive = false;

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
