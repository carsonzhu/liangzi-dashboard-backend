import * as locale from "./locale";

class localeClass {
  constructor() {
    for (let [key, val] of Object.entries(locale)) {
      this[val] = "";
    }
  }

  static getClassName() {
    return "localeClass";
  }

  getText({ lan }) {
    const result = this[lan];
    return result;
  }

  setText({ lan, text }) {
    if (typeof lan !== "string") return false;
    if (typeof text !== "string") return false;

    if (this.hasOwnProperty(lan) || locale.hasOwnProperty(lan)) {
      this[lan] = text;
      return true;
    }

    return false;
  }
}

export default localeClass;
