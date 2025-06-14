/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import Condition from "../commons/Condition";

type Column<T> = {
  label: string;
  accessor: (row: T) => React.ReactNode;
};

type LightTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  selectedRows: (value: string | string[]) => void;
  input: "single" | "multi";
  size?: string;
  reset?: boolean;
  defaultCheckedValues?: string[] | string;
  isCloseIcon?: boolean;
};

export const LightTable = <T extends { id: string | number }>({
  data,
  columns,
  selectedRows,
  input,
  size = "13px",
  reset = false,
  defaultCheckedValues = [],
  isCloseIcon = true,
}: LightTableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<string | number | "">("");
  const [checkedValues, setCheckedValues] = useState<(string | number)[]>([]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedRow(value);
    selectedRows(value);
  };

  const handleCheckboxChange = (value: string | number) => {
    const updatedCheckedValues: any = checkedValues.includes(value)
      ? checkedValues.filter((item) => item !== value)
      : [...checkedValues, value];

    setCheckedValues(updatedCheckedValues);
    selectedRows(updatedCheckedValues);
  };

  useEffect(() => {
    if (reset) {
      setSelectedRow("");
      setCheckedValues([]);
    }
  }, [reset]);

  useEffect(() => {
    if (!isCloseIcon) {
      if (Array.isArray(defaultCheckedValues)) {
        setCheckedValues(defaultCheckedValues);
      } else {
        setSelectedRow(defaultCheckedValues);
      }
    }
  }, [defaultCheckedValues, isCloseIcon]);

  return (
    <TableContainer className="light-table">
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell key={index} sx={{ fontSize: size }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <TableCell key={colIndex} sx={{ fontSize: `${size}px` }}>
                  <div className="flex items-center">
                    <Condition show={colIndex === 0}>
                      {input === "single" && (
                        <RadioGroup
                          aria-label="radio"
                          name="radio-group"
                          value={selectedRow}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value={row.id}
                            control={
                              <Radio
                                size="small"
                                disableRipple
                                className="!px-2 !py-1"
                              />
                            }
                            className="!mr-0"
                            label=""
                          />
                        </RadioGroup>
                      )}
                      {input === "multi" && (
                        <FormControlLabel
                          label=""
                          value={row.id}
                          className="!mr-0"
                          control={
                            <Checkbox
                              checked={checkedValues.includes(row.id)}
                              onChange={() => handleCheckboxChange(row.id)}
                              size="small"
                              disableRipple
                              className="!px-2 !py-1"
                            />
                          }
                        />
                      )}
                    </Condition>
                    {column.accessor(row)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LightTable;
