"use strict";

import express from "express";
import mongoose from "../utilities/mongoose";

import {
  createUser,
  getUsers,
  getSingleUser,
  editUser,
  removeUser
} from "./admins/userCRUD";
import {
  getSingleVehicle,
  getVehicles,
  addVehicle,
  updateVehicle,
  removeVehicle
} from "./vehicles/vehiclesCRUD";
import {
  getVehicleTypes,
  createVehicleType
} from "./vehicleTypes/vehicleTypesCR";

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
 * Admin APIs
 ***************************/
//middleware (authentication) => check if the user can access the api
//ie. router.get("/apis/admins", authentication, getUsers);

router.get("/apis/admins", getUsers);
router.get("/apis/admins/:userId", getSingleUser);
router.post("/apis/admins", createUser);
router.put("/apis/admins", editUser);
router.delete("/apis/admins", removeUser);

/***************************
 * Vehicle APIs
 ***************************/
router.get("/apis/vehicles", getVehicles);
router.get("/apis/vehicles/:vehicleId/:language", getSingleVehicle);
router.post("/apis/vehicles", addVehicle);
router.put("/apis/vehicles", updateVehicle);
router.delete("/apis/vehicles", removeVehicle);

/***************************
 * VehicleType APIs
 ***************************/
router.get("/apis/vehicleTypes", getVehicleTypes);
router.post("/apis/vehicleTypes", () => {});

/***************************
 * Location APIs
 ***************************/
router.get("/apis/locations", () => {});
router.post("/apis/locations", () => {});

/***************************
 * RentalCompany APIs
 ***************************/
router.get("/apis/rentalCompanies", () => {});
router.post("/apis/rentalCompanies", () => {});

/***************************
 * Insurance APIs
 ***************************/
router.get("/apis/insurances", () => {});
router.post("/apis/insurances", () => {});
router.put("/apis/vehicles", () => {});
router.delete("/apis/vehicles", () => {});

router.all("*", function(req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found"
  });
});

export default router;
