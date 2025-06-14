/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "d3-format";
import FormValidationUtils from "./FormValidationsUtils";

export class StringUtils {
  static getImageName = (url: string): string => {
    const index: number = url.lastIndexOf("/") + 1;
    const imageName: string = url.substr(index);
    return imageName;
  };

  static numberToFixedDecimalLocalString = (
    value: any,
    decimal: any,
    raw: any
  ) => StringUtils.numberToFixedDecimal(value, decimal, raw);

  static replaceMultipleSpaces = (text: any) =>
    String(text).trimStart().replace(/\s+/g, " ");

  static charCount = (text: string | null, space: boolean = false): number =>
    text !== null ? String(text).replace(space ? /\s/g : "", "").length : 0;

  static replaceAllWildCharater = (searchTerm: string): string => {
    const replaceCharaters: string[] = "\\,[,],^,$,.,|,?,*,+,(,)".split(",");

    replaceCharaters.forEach(
      (item: string) =>
        (searchTerm = searchTerm.split(`${item}`).join(`\\${item}`))
    );

    return searchTerm;
  };

  static matchedWords = ({
    sentence,
    searchTerm = "",
  }: {
    sentence: string;
    searchTerm?: string;
  }) => {
    return (
      sentence?.match?.(
        new RegExp(StringUtils.replaceAllWildCharater(searchTerm), "gi")
      ) || []
    )
      .toString()
      .replace(/,/g, "").length;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static replaceFirstSlash = (dataString: any) =>
    String(dataString).replace(/^\//, "");

  static noValue = ({ value = "NA" } = {}) => (
    <div className="italic text-red-700 text-xs">
      <span className="underline underline-offset-1 decoration-dotted">
        {value}
      </span>
    </div>
  );

  static numberToFixedDecimal = (
    value,
    decimal = 2,
    raw = false,
    noValue = "NA"
  ) => {
    if (!FormValidationUtils.isValidNumber(value, true)) {
      if (raw) {
        return noValue;
      }

      return StringUtils.noValue({ value: noValue });
    }

    // const roundedNum = Math.round(+value * 100) / 100;
    value = Number(value).toFixed(decimal);

    if (!raw) {
      return Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: decimal,
        minimumFractionDigits: decimal,
      });
    }

    // const f = raw ? format(`.${decimal}f`) : format(`,.${decimal}f`);

    return format(`.${decimal}f`)(value);
  };

  static numberToFixed = (value = 0, toFixed = 2, truncate = true) => {
    return isNaN(value)
      ? value
      : !truncate
      ? Math.trunc(value * 100) / 100
      : Number(value).toFixed(toFixed).replace(".00", "");
  };
}

export default StringUtils;
