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
import { getLocations, createLocation } from "./locations/locationCR";
import {
  getRentalCompanies,
  createRentalCompany
} from "./rentalCompanies/rentalCompaniesCR";
import {
  getInsurances,
  createInsurance,
  editInsurance,
  removeInsurance
} from "./insurances/insurancesCRUD";

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
router.post("/apis/vehicleTypes", createVehicleType);

/***************************
 * Location APIs
 ***************************/
router.get("/apis/locations", getLocations);
router.post("/apis/locations", createLocation);

/***************************
 * RentalCompany APIs
 ***************************/
router.get("/apis/rentalCompanies", getRentalCompanies);
router.post("/apis/rentalCompanies", createRentalCompany);

/***************************
 * Insurance APIs
 ***************************/
router.get("/apis/insurances", getInsurances);
router.post("/apis/insurances", createInsurance);
router.put("/apis/insurances", editInsurance);
router.delete("/apis/insurances", removeInsurance);

router.all("*", function(req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found"
  });
});

export default router;
