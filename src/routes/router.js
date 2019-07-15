"use strict";

import express from "express";
import mongoose from "../utilities/mongoose";

import {
  createUser,
  getUsers,
  getSingleUser,
  editUser,
  removeUser
} from "./users/userCRUD";
import { registerWithEmail } from "./authentication/email";
import { login } from "./authentication/common";

const router = express.Router();

mongoose.connect(process.env.DB_CONNNECTION_STRING);

/***************************
 * Authentication APIs
 ***************************/
// router.post(
//   "/apis/authentication/register/email/verificationCode",
//   getEmailVerificationCode
// );
// router.post(
//   "/apis/authentication/getForgetPasswordVerificationCode",
//   getForgetPasswordVerificationCode
// );
// router.post(
//   "/apis/authentication/changePasswordWithCode",
//   changePasswordWithCode
// );
router.post("/apis/authentication/register/email", registerWithEmail);
router.post("/apis/authentication/login", login);

/***************************
 * User APIs
 ***************************/
//middleware (authentication) => check if the user can access the api
//ie. router.get("/apis/users", authentication, getUsers);

//change "users" => "admins" to avoid confusion

router.get("/apis/admins", getUsers);
router.get("/apis/admins/:userId", getSingleUser);
router.post("/apis/admins", createUser);
router.put("/apis/admins", editUser);
router.delete("/apis/admins", removeUser);

router.all("*", function(req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found"
  });
});

export default router;
