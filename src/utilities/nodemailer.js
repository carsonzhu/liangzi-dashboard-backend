"use strict";

import nodemailer from "nodemailer";
import { google } from "googleapis";

const sendEmail = async (to, subject, html) => {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, // ClientID
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
  });
  const tokens = await oauth2Client.getRequestHeaders();
  const accessToken = tokens.Authorization;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.FROM_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    generateTextFromHTML: true,
    html: html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(info);
    });
  });
};

export { sendEmail };
