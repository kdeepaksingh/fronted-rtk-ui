/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  STRENGTH_MEDIUM,
  STRENGTH_STRONG,
  STRENGTH_WEAK,
} from "../components/constants";
import StringUtils from "./StringUtils";
import { sum } from "lodash";

export class FormValidationUtils {
  static isInteger = (number: string | number): boolean => {
    return /^[0-9]+$/.test(String(number));
  };

  static isNumber = (number: string | number): boolean => {
    return /^\d*$/.test(String(number));
  };

  static allowEveryThing = (text: any, min: any) => {
    if (text && min) {
      return (
        FormValidationUtils.isValid(text) &&
        FormValidationUtils.minCharCount(text, min) &&
        new RegExp(
          /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+:/\\`'",.?~=\s-]{2,}$/i
        ).test(text)
      );
    }

    return (
      FormValidationUtils.isValid(text) &&
      new RegExp(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+:/\\`'",.?~=\s-]{2,}$/i).test(
        text
      )
    );
  };

  static isValidNumber = (
    ID: string | number | Array<string | number>,
    allowZero: boolean = false
  ): boolean => {
    if (Array.isArray(ID)) {
      return ID.every((v) => FormValidationUtils.isValidNumber(v, allowZero));
    }

    // Check if input is neither a number nor a string
    if (typeof ID !== "number" && typeof ID !== "string") {
      return false;
    }

    const number = Number(ID);

    if (isNaN(number)) {
      return false;
    }

    return allowZero ? number >= 0 : number > 0;
  };

  static isValid = (text: string | number | null | undefined): boolean => {
    return Boolean(text && String(text).trim?.());
  };

  static passwordMatch = (text: string, text2: string): boolean => {
    return text === text2;
  };

  static alphaNumericcomma = (text: string): boolean =>
    FormValidationUtils.isValid(text) &&
    new RegExp(/^[a-zA-Z][a-zA-Z0-9\s]+(, [a-zA-Z][a-zA-Z0-9\s]+)*$/).test(
      text
    );

  //start with char only, end with char/num only, limit 3 char, one space, special chars @.,_-

  static alphaNumeric = (text: string): boolean =>
    FormValidationUtils.isValid(text) &&
    new RegExp(
      /^(?=.*[a-zA-Z])[a-zA-Z]{2,}(\s[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?)*([@._-][a-zA-Z0-9]+)?[a-zA-Z0-9]+$/
    ).test(text);

  //start with char only, end with char/num only, special chars @.,_-

  static alphaNumericCombine = (text: string): boolean =>
    FormValidationUtils.isValid(text) &&
    /^(?=.{3,300}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*(?:[@.,_-][a-zA-Z0-9\s]*[a-zA-Z0-9])*$/.test(
      text
    ) &&
    !/\s\s/.test(text);

  //start with char only, end with char/num only, limit 3 char, one space
  static alphaNumericNoSymbol = (text: string): boolean =>
    FormValidationUtils.isValid(text) &&
    new RegExp(/^[a-zA-Z][a-zA-Z0-9\s]{1,}[a-zA-Z0-9]$/).test(text);

  //start with char only, end with char/num only, limit 3 char, one space and restrict /[];
  static minThreeValidate = (text: any) =>
    FormValidationUtils.isValid(text) &&
    new RegExp(
      /^[a-zA-Z][a-zA-Z0-9\s.!"#$%&'()*+,-/:=?@^_`{|}~]*[a-zA-Z0-9.]{2,}$/
    ).test(text);

  static minThreeChar = (text: any) =>
    FormValidationUtils.isValid(text) &&
    new RegExp(/^([0-9]*[a-zA-Z\s0-9]){3,}[0-9]*$/i).test(text);

  static allowEveryThing = (text: any, min: any) => {
    if (text && min) {
      return (
        FormValidationUtils.isValid(text) &&
        FormValidationUtils.minCharCount(text, min) &&
        new RegExp(
          /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+:/\\`'",.?~=\s-]{2,}$/i
        ).test(text)
      );
    }

    return (
      FormValidationUtils.isValid(text) &&
      new RegExp(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+:/\\`'",.?~=\s-]{2,}$/i).test(
        text
      )
    );
  };

  static isValidPassword = (text: string): boolean =>
    FormValidationUtils.isValid(text) &&
    new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/).test(
      text
    ) &&
    !FormValidationUtils.wrongSpecialChar(text);

  static isValidEmail = (text: string): boolean => {
    return (
      FormValidationUtils.isValid(text) &&
      new RegExp(
        /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,4}$/
      ).test(text)
    );
  };

  static minCharCount = (text: string, count: number = 3): boolean =>
    (typeof text === "string" ? text.trim().length : 0) >= count;

  static removeTag = (v: string): string =>
    String(v).replace(/</g, "&lt;").replace(/>/g, "");

  static removeExtraSpaces = (text: string): string => {
    const cleanedInput: string = text.replace(/\s+/g, " ");
    return cleanedInput;
  };

  static removeSpaces = (text: string): string => {
    const cleanedInput: string = text.replace(/\s+/g, "");
    return cleanedInput;
  };

  static maxCharacters = (
    text: string,
    count: number = 300,
    space: boolean = false
  ): boolean => StringUtils.charCount(text, space) <= count;

  static maxDeciCount = (text: any, count = 5) => {
    let reg = `^\\d+(\\.\\d{0,${count}})?$`;

    if (Number(count) === 0) {
      reg = `^[0-9]+$`;
    }

    return RegExp(reg).test(String(text)) || !text;
  };

  static validDecimalNumber = ({
    value,
    maxNumber = 9,
    maxDecimal = 5,
    allowZero = false,
  }: {
    value: string | number;
    maxNumber?: number;
    maxDecimal?: number;
    allowZero?: boolean;
  }) => {
    if (!FormValidationUtils.isValidNumber(value, allowZero)) {
      return false;
    }

    let [wholeNumber] = String(value).split(".");

    return Boolean(
      FormValidationUtils.maxCharacters(wholeNumber, maxNumber) &&
        FormValidationUtils.maxDeciCount(value, maxDecimal)
    );
  };

  static passwordStrength = (text: any) => {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    ).test(text);

    let mediumPassword = new RegExp(
      "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
    ).test(text);

    const strength =
      (strongPassword && STRENGTH_STRONG) ||
      (mediumPassword && STRENGTH_MEDIUM) ||
      STRENGTH_WEAK;

    const classes = {
      [STRENGTH_STRONG]: "text-upag-green",
      [STRENGTH_MEDIUM]: "text-upag-warning",
      [STRENGTH_WEAK]: "text-upag-error",
    };

    return {
      strength,
      isValid: strongPassword || mediumPassword,
      classes: classes[strength],
    };
  };

  static isValidCode = (text: string): boolean => {
    return new RegExp(/[0-9]{6,}/i).test(text);
  };
  static isValidAlpha = (text: string): boolean => {
    return new RegExp(/^(?!.*\s{2})(?! )[a-zA-Z0-9 ]{3,15}$/i).test(text);
  };

  static minUpperCase = (text: string): boolean => {
    return RegExp(/[A-Z]/).test(text);
  };

  static minLowerCase = (text: string): boolean => {
    return RegExp(/[a-z]/).test(text);
  };

  static minNumberChar = (text: string): boolean => {
    return RegExp(/[0-9]/).test(text);
  };

  static minSpecialChar = (text: string): boolean => {
    return RegExp(/[!@#$%^&*]/).test(text);
  };

  static wrongSpecialChar = (text: string): boolean => {
    return RegExp(/[^a-zA-Z0-9!@#$%^&*]/).test(text);
  };

  static allEmpty = (values = []) => values.every((val) => !val);
  static allValid = (
    values = [],
    action: keyof typeof FormValidationUtils = "isValid"
  ) =>
    values.every((val) =>
      (FormValidationUtils[action] as (arg: any) => boolean)(val)
    );

  static validPhoneNumber = (text: string): boolean => {
    return RegExp(/^(?!([6-9])\1{9})[6-9][0-9]{9}$/).test(text);
  };

  static validOptionalPhoneNumber = (
    text: string,
    optional: boolean = false
  ): boolean => {
    if (!text && optional) return true;
    return RegExp(/^[0-9]{10}$/).test(text);
  };

  static validOTP = (text: string): boolean => {
    return RegExp(/^[0-9]{6}$/).test(text);
  };

  static validOptional: (text: string, optional?: boolean) => boolean;

  static isLessThan = (
    v1: string | number,
    v2: string | number,
    equal: boolean = true
  ): boolean => +v1 < +v2 || (equal ? +v1 === +v2 : false);

  static validateParams = (
    rules: { [key: string]: (value: any) => boolean },
    parmas: { [key: string]: any }
  ): boolean =>
    Object.keys(parmas).every((key) =>
      rules[key] ? rules[key](parmas[key]) : true
    );

  static isValidPercentage = (value: string | number): boolean => {
    return FormValidationUtils.isValidNumber(value, true) && +value <= 100;
  };

  static percentageSum = (values = []) => {
    return sum(
      values.filter((v) => FormValidationUtils.isValidNumber(v)).map(Number)
    );
  };

  static isValidPercentageSum = (values = [], greaterThanZero = false) => {
    let percentage = FormValidationUtils.percentageSum(values);
    return percentage <= 100 && (greaterThanZero ? percentage > 0 : true);
  };

  static percentageSumm(values: Array<number | string>): number {
    return values.reduce(
      (sum: number, value: number | string) =>
        sum + parseFloat(value as string) || 0,
      0
    );
  }

  static isValidPercentageSumm(
    values: Array<number | string>,
    exact: boolean = false
  ): boolean {
    const sum = this.percentageSumm(values);
    return exact ? sum === 100 : sum <= 100;
  }
}

export default FormValidationUtils;
