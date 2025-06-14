/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { ICellEditorParams } from "ag-grid-community";
import FormValidationUtils from "../../../utils/FormValidationsUtils";

interface NumberEditorParams extends ICellEditorParams {
  colDef: {
    field: string;
    cellRendererParams: {
      disabledKey?: string;
      decimal?: number;
      isEditable?: (props: ICellEditorParams) => boolean;
    };
  };
  data: any;
  value: string | number | null;
}

export const NumberEditor = forwardRef<HTMLInputElement, NumberEditorParams>(
  (props, ref) => {
    const {
      colDef: {
        field,
        cellRendererParams: {
          disabledKey,
          decimal = 2,
          isEditable = () => true,
        },
      },
      data,
      value: initialValue,
    } = props;

    const [value, setValue] = useState<string | number | null>(initialValue);

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      isCancelAfterEnd: () => value === null || isNaN(Number(value)),
    }));

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (
        FormValidationUtils.validDecimalNumber({
          value: inputValue,
          allowZero: true,
          maxDecimal: decimal,
        }) &&
        (!data.validate || data.validate({ field, value: inputValue }))
      ) {
        setValue(inputValue);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        typeof value === "string" &&
        value.length === 1 &&
        decimal === 0
      ) {
        setValue("");
      }
    };

    const isDisabled =
      (disabledKey && !data[disabledKey]?.()) || !isEditable(props);

    if (isDisabled) {
      return <>{value}</>;
    }

    return (
      <input
        value={!["NA", null].includes(value as string) ? value ?? "" : ""}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", height: "100%" }}
        autoFocus
      />
    );
  }
);

export default NumberEditor;
