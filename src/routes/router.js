"use strict";

import express from "express";

import { createUser, getUsers, editUser, removeUser } from "./users/userCRUD";
import { registerWithEmail } from "./authentication/email";
import { login } from "./authentication/common";

const router = express.Router();

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
router.post("/apis/users", createUser);
router.get("/apis/users/:userId", getUsers);
router.put("/apis/users", editUser);
router.delete("/apis/users", removeUser);

router.all("*", function(req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found"
  });
});

export default router;
