import React from "react";
import moment from "moment";
import Condition from "../commons/Condition";

interface CustomDateProps {
  value?: string | number | Date | null;
  dateOnly?: boolean;
  dateFormat?: string;
  timeFormat?: string;
  raw?: boolean;
}

export const CustomDate: React.FC<CustomDateProps> = ({
  value,
  dateOnly = false,
  dateFormat = "MMM DD, YYYY",
  timeFormat = "hh:mm:ss A",
  raw = false,
}) => {
  if (!value) return <>-</>;

  const date = moment(value);

  if (!date.isValid()) return <>Invalid date</>;

  if (raw) {
    return (
      <>{date.format(`${dateFormat}${dateOnly ? "" : ` ${timeFormat}`}`)}</>
    );
  }

  return (
    <div>
      <div className="font-semibold text-gray-600">
        <span className="border-b border-dashed">
          {date.format(dateFormat)}
        </span>
      </div>
      <Condition show={!dateOnly}>
        <div className="text-gray-500 text-xxs mb-1 leading-relaxed">
          {date.format(timeFormat)}
        </div>
      </Condition>
    </div>
  );
};

export default CustomDate;
