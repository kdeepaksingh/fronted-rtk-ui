/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import RHFTextInput from "../inputs/RHFTextInput";

type CellRendererParams = {
  value?: string;
  colDef: {
    cellRendererParams?: {
      onApply?: (args: { newValue: string } & CellRendererParams) => void;
    };
  };
  [key: string]: any;
};

const DateCellRenderer: React.FC<CellRendererParams> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.value);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (props.colDef.cellRendererParams?.onApply) {
      props.colDef.cellRendererParams.onApply({
        ...props,
        newValue,
      });
    }
  };

  return (
    <div className="-mt-4 !w-[120px]">
      <RHFTextInput
        type="date"
        value={value || ""}
        onChange={onChange}
        className="h-7 p-[10px] rounded-md"
      />
    </div>
  );
};

export default DateCellRenderer;
