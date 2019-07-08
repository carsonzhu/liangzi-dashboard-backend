"use strict";

import express from "express";

const router = express.Router();

/***************************
 * Authentication APIs
 ***************************/
router.post(
  "/apis/authentication/register/email/verificationCode",
  getEmailVerificationCode
);
router.post("/apis/authentication/register/email", registerWithEmail);
router.post(
  "/apis/authentication/register/phone/verificationCode",
  getPhoneVerificationCode
);
router.post("/apis/authentication/register/phone", registerWithPhone);
router.post("/apis/authentication/login", login);
router.post(
  "/apis/authentication/getForgetPasswordVerificationCode",
  getForgetPasswordVerificationCode
);
router.post(
  "/apis/authentication/changePasswordWithCode",
  changePasswordWithCode
);

/***************************
 * User APIs
 ***************************/
router.post("/apis/users", () => {});
router.get("/apis/users", () => {});
router.put("/apis/users", () => {});

router.all("*", function(req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found"
  });
});

export default router;
