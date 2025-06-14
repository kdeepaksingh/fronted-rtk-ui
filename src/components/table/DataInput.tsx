/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClickAwayListener, Input, Tooltip } from "@mui/material";
import type { InputProps } from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

type ValidationRule = (value: string) => boolean;
type Validation = {
  rules?: ValidationRule[];
  message?: string | string[];
};

type CellRendererParams = {
  render?: (args: any) => JSX.Element;
  onChange?: (args: {
    field?: string;
    rowIndex: number;
    changedValue: string;
    value: string;
    hasError: boolean;
    error?: string | string[];
    api?: any;
    row: Record<string, any>;
    node?: any;
  }) => void;
  validations?: Validation;
  type?: "text" | "dropdown" | string;
  alwaysInput?: boolean;
  editable?: boolean;
  [key: string]: any;
};

type ColDef = {
  field?: string;
  cellRendererParams?: CellRendererParams;
};

type DataInputProps = {
  api?: any;
  value?: string;
  colDef?: ColDef;
  data: {
    editRow?: boolean;
    dataRowIndex?: number;
    reset?: string;
    [key: string]: any;
  };
  rowIndex: number;
  node?: any;
};

export const DataInput = (props: DataInputProps): JSX.Element | null => {
  const {
    api,
    value,
    colDef: {
      field,
      cellRendererParams: {
        render = false,
        onChange,
        validations = {},
        type = "text",
        alwaysInput = false,
        editable = true,
        ...restParams
      } = {},
    } = {},
    data: { editRow = false, dataRowIndex, reset = "", ...restData },
    rowIndex,
    node,
  } = props;

  const [changedValue, setChangedValue] = useState(value || "");
  const [showInput, setShowInput] = useState<boolean>(editRow);

  useEffect(() => {
    setShowInput(editRow);
  }, [editRow]);

  useEffect(() => {
    if (reset) {
      setChangedValue(value || "");
    }
  }, [reset, value]);

  if (typeof value === "undefined") return null;

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | undefined,
    fake = false
  ) => {
    const inputValue =
      fake !== true && e?.target?.value !== undefined
        ? e.target.value
        : changedValue;
    let error: string | string[] = "";
    let hasError = false;

    setChangedValue(inputValue);

    if (validations.rules?.length) {
      const validationResults = validations.rules.map((vFunct) =>
        vFunct(inputValue)
      );
      hasError = validationResults.some((r) => !r);

      if (validations.message && hasError) {
        if (typeof validations.message === "string") {
          error = validations.message;
        } else {
          error = [];
          validationResults.forEach((r, i) => {
            if (!r) error.push(validations.message![i]);
          });
        }
      }
    }

    onChange?.({
      field,
      rowIndex: typeof dataRowIndex !== "undefined" ? dataRowIndex : rowIndex,
      changedValue: inputValue,
      value: value || "",
      hasError,
      error,
      api,
      row: restData,
      node,
    });
  };

  const inputProps: InputProps = {
    className: "border-0 !px-2",
    type,
    value: changedValue || "",
    onChange: onChangeInput,
    disableUnderline: true,
    autoFocus: true,
    onBlur: () => api?.redrawRowsells?.(),
    ...restParams,
  };

  let displayValue: string = changedValue || "";
  let FormInput: any = Input;

  if (type === "dropdown") {
    FormInput = ListInput;
    const found = restParams.data?.find?.(
      (item: any) => String(item[restParams.dataID]) === String(changedValue)
    );
    displayValue = found?.[restParams.dataValue] || "-";
  }

  if (alwaysInput) {
    return render ? (
      render({ data: restData, FormInput, inputProps })
    ) : (
      <FormInput {...inputProps} />
    );
  }

  if (showInput) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          api?.redrawRowsells?.();
          setShowInput(false);
        }}
      >
        <div>
          <FormInput {...inputProps} />
        </div>
      </ClickAwayListener>
    );
  }

  return (
    <div
      className="h-full"
      onClick={() => {
        if (editable) setShowInput(true);
      }}
    >
      {render ? (
        render({
          ...props,
          value: changedValue,
          displayValue,
          FormInput,
          inputProps,
        })
      ) : displayValue.length > 30 ? (
        <Tooltip title={displayValue} placement="top">
          <div className="text-ellipsis overflow-hidden">{displayValue}</div>
        </Tooltip>
      ) : (
        displayValue
      )}
    </div>
  );
};

export default DataInput;
