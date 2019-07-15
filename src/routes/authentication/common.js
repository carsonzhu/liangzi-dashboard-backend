"user strict";

import VerificationCodeModel from "../../models/verificationCode";
import UserModel from "../../models/users";
import logger from "../../utilities/logger";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import { sendEmail } from "../../utilities/nodemailer";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 400,
        message: "Missing password"
      });
    }

    let query = {
      email
    };

    const user = await UserModel.findOne(query);
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "Wrong password or username"
      });
    }

    const userModel = new UserModel(user);

    const validPassword = await userModel.validPassword(password);
    if (!validPassword) {
      return res.status(400).send({
        status: 400,
        message: "Wrong password or username"
      });
    }

    if (!!userModel && !userModel.isActive) {
      return res.status(400).send({
        status: 400,
        message: "The user is suspended"
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_HOURS // expires in 24 hours
    });

    const userInfo = await UserModel.findOne(query).select({
      userType: 1,
      allowedOperations: 1,
      id: 1,
      username: 1
    });

    return res.status(200).send({
      status: 200,
      token,
      userInfo
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal error"
    });
  }
};

const getForgetPasswordVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Missing email"
      });
    }

    const user = await UserModel.findOne({
      email: email
    });
    if (!user) {
      return res.status(200).send({
        status: 200,
        message: "Sent"
      });
    }

    // Check if email activateion code exists
    let verificationCode = await VerificationCodeModel.findOne({
      email: email
    });
    if (verificationCode) {
      await sendEmail(
        email,
        "Alfasommet - Verification Code",
        "<b>" + verificationCode.code + "</b>"
      );
      return res.status(200).json({
        status: 200,
        message: "Sent"
      });
    }

    const verificationCodeModel = new VerificationCodeModel({
      code: shortid.generate(),
      email: email
    });
    const newVerificationCode = await verificationCodeModel.save();

    await sendEmail(
      email,
      "Alfasommet - Verification Code",
      "<b>" + newVerificationCode.code + "</b>"
    );
    return res.status(200).json({
      status: 200,
      message: "Sent"
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal error"
    });
  }
};

const changePasswordWithCode = async (req, res) => {
  try {
    const {
      email: email,
      phoneCountryCode: phoneCountryCode,
      phoneNumber: phoneNumber,
      method: method, // phone, email
      password: password,
      verificationCode: verificationCode
    } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 400,
        message: "Missing password"
      });
    }

    let query = null;
    if (method === "email") {
      if (!email) {
        return res.status(400).json({
          status: 400,
          message: "Missing email"
        });
      }

      query = {
        email: email
      };
    } else if (method === "phone") {
      if (!phoneNumber) {
        return res.status(400).json({
          status: 400,
          message: "Missing phoneNumber"
        });
      }

      if (!phoneCountryCode) {
        return res.status(400).json({
          status: 400,
          message: "Missing phoneCountryCode"
        });
      }

      query = {
        phoneCountryCode: phoneCountryCode,
        phoneNumber: phoneNumber
      };
    } else {
      return res.status(400).send({
        status: 400,
        message: "Wrong method"
      });
    }

    // Verify verification code
    let existingVerificationCode = await VerificationCodeModel.findOne(query);
    if (!existingVerificationCode) {
      return res.status(400).json({
        status: 400,
        message: "Verification code not found"
      });
    } else if (existingVerificationCode.code != verificationCode) {
      return res.status(400).json({
        status: 400,
        message: "Invalid verification code"
      });
    }

    const user = await UserModel.findOne(query);
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "User not found"
      });
    }
    const userModel = new UserModel(user);
    userModel.password = await userModel.generateHash(password);
    const updatedUser = userModel.save();
    await existingVerificationCode.remove();
    return res.status(200).send({
      status: 200,
      message: "Passord updated"
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      description: "Internal error"
    });
  }
};

export { login, getForgetPasswordVerificationCode, changePasswordWithCode };
