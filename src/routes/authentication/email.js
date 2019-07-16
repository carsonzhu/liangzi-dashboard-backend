"use strict";
import UserModel from "../../models/admin";
import VerificationCodeModel from "../../models/verificationCode";
import shortid from "shortid";
import logger from "../../utilities/logger";
import { sendEmail } from "../../utilities/nodemailer";

const registerWithEmail = async (req, res) => {
  try {
    const { email, verificationCode, password } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        description: "Missing email"
      });
    }

    if (!verificationCode) {
      return res.status(400).json({
        status: 400,
        description: "Missing verificationCode"
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 400,
        description: "Missing password"
      });
    }

    // Check if email exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        description: "Email exists"
      });
    }

    // Verify verification code
    let existingVerificationCode = await VerificationCodeModel.findOne({
      email
    });

    if (!existingVerificationCode) {
      return res.status(400).json({
        status: 400,
        description: "Verification code not found"
      });
    } else if (existingVerificationCode.code != verificationCode) {
      return res.status(400).json({
        status: 400,
        description: "Invalid verification code"
      });
    }

    const userModel = new UserModel({
      email,
      password
    });

    userModel.password = await userModel.generateHash(password);
    const newUser = await userModel.save();
    await existingVerificationCode.remove();

    return res.status(200).json({
      status: 200,
      userId: newUser._id
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal error"
    });
  }
};

const getEmailVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        description: "Missing email"
      });
    }

    // Check if email exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 409,
        description: "Email exists"
      });
    }

    // Check if email activateion code exists
    let verificationCode = await VerificationCodeModel.findOne({
      email
    });
    if (verificationCode) {
      await sendEmail(
        email,
        "Alfasommet - Verification Code",
        "<b>" + verificationCode.code + "</b>"
      );
      return res.status(200).json({
        status: 200,
        description: "Sent"
      });
    }

    const verificationCodeModel = new VerificationCodeModel({
      code: shortid.generate(),
      email
    });
    const newVerificationCode = await verificationCodeModel.save();

    await sendEmail(
      email,
      "Alfasommet - Verification Code",
      "<b>" + newVerificationCode.code + "</b>"
    );
    return res.status(200).json({
      status: 200,
      description: "Sent"
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal error"
    });
  }
};

export { registerWithEmail, getEmailVerificationCode };
