"use strict";

import validator from "validator";
import moment from "moment";

import localeClass from "../locale/localeClass";

export const validateEmail = email => {
  return validator.isEmail(email);
};

export const validatePhone = phone => {
  return validator.isMobilePhone(phone);
};

export const validateInteger = num => {
  return validator.isInt(num.toString());
};

export const strIsEmpty = str => {
  return validator.isEmpty(str);
};

export const validateDate = date => {
  date = moment(date);
  return date.isValid();
};

export const validateUrl = url => {
  urlRegex = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(url);
};

export const localeObjectValidation = obj => {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const {
        constructor: { name = "" }
      } = item;
      if (name !== localeClass.getClassName()) return false;
    }
    return true;
  }

  const {
    constructor: { name = "" }
  } = obj;

  return name === localeClass.getClassName();
};
