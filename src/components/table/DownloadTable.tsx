/* eslint-disable prefer-const */
import kebabCase from "lodash/kebabCase";
import { Download } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Alert, TextField } from "@mui/material";

import type { FC, MutableRefObject } from "react";
import { ArrayUtils } from "../../utils/ArrayUtils";
import colors from "../../color";
import FormValidationUtils from "../../utils/FormValidationsUtils";
import MainButton from "../buttons/MainButton";
import Modal from "../modal/Modal";
import StringUtils from "../../utils/StringUtils";
import Translate from "../typography/Translate";

// Border style type
interface BorderStyle {
  color: string;
  weight?: number;
  lineStyle?: string;
}

// Header style options
interface HeaderStyleOptions {
  id: string;
  bg?: string;
  borderColor?: string;
  bold?: boolean;
}

// Excel style type
interface ExcelStyle {
  id: string;
  font?: { bold: boolean };
  interior?: {
    color: string;
    pattern: string;
  };
  borders?: {
    borderBottom: BorderStyle;
    borderLeft: BorderStyle;
    borderRight: BorderStyle;
    borderTop: BorderStyle;
  };
}

export const createBorderStyle = (
  color: string,
  weight = 1,
  lineStyle = "Continuous"
): BorderStyle => ({ color, weight, lineStyle });

export const createHeaderStyles = ({
  id,
  bg,
  borderColor,
  bold = true,
}: HeaderStyleOptions): ExcelStyle => ({
  id,
  font: { bold },
  ...ArrayUtils.addWhen(
    {
      interior: {
        color: bg!,
        pattern: "Solid",
      },
    },
    Boolean(bg),
    false
  ),
  ...ArrayUtils.addWhen(
    {
      borders: {
        borderBottom: createBorderStyle(borderColor!),
        borderLeft: createBorderStyle(borderColor!),
        borderRight: createBorderStyle(borderColor!),
        borderTop: createBorderStyle(borderColor!),
      },
    },
    Boolean(borderColor),
    false
  ),
});

export const excelStyles: ExcelStyle[] = [
  createHeaderStyles({
    id: "header",
    bg: colors["ui-brown-light"],
    borderColor: colors["ui-secondary"],
  }),
  createHeaderStyles({
    id: "header-area",
    bg: colors["ui-brown-light"],
    borderColor: colors["ui-brown-dark"],
  }),
  createHeaderStyles({
    id: "header-yield",
    bg: colors["ui-brown-light1"],
    borderColor: colors["ui-brown-light1"],
  }),
  createHeaderStyles({
    id: "header-production",
    bg: colors["ui-brown-light1"],
    borderColor: colors["ui-brown-light1"],
  }),
  createHeaderStyles({
    id: "grand-total-cell",
    bg: colors["ui-brown-light1"],
  }),
  createHeaderStyles({
    id: "total-cell",
    bg: colors["ui-brown-light1"],
  }),
];

interface DownloadOptions {
  sheetName?: string;
  fileName?: string;
}

interface PageInfo {
  page?: number;
  pageCount?: number;
  limit?: number;
}

interface TableRef {
  current: {
    api: {
      exportDataAsExcel: (options: {
        sheetName: string;
        fileName: string;
        excelStyles: ExcelStyle[];
        allColumns: boolean;
      }) => void;
    };
  };
}

interface DownloadTableProps {
  hasData?: boolean;
  tableRef: MutableRefObject<TableRef["current"] | null>;
  downloadOptions?: DownloadOptions;
  allowFileChange?: boolean;
  showPageInfo?: boolean;
  pageInfo?: PageInfo;
  displayDataCount?: number;
}

export const DownloadTable: FC<DownloadTableProps> = ({
  hasData = false,
  tableRef = null,
  downloadOptions = {},
  allowFileChange = true,
  showPageInfo = false,
  pageInfo = {},
  displayDataCount = 0,
}) => {
  const { sheetName = "Data", fileName = "ui data export" } = downloadOptions;
  const [name, setName] = useState(fileName);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setName(fileName);
  }, [fileName]);

  const handleClose = () => {
    setOpen(false);
    if (!FormValidationUtils.minCharCount(name)) setName(fileName);
  };

  const downloadData = () => {
    tableRef?.current?.api?.exportDataAsExcel({
      sheetName,
      fileName: kebabCase(name),
      excelStyles,
      allColumns: false,
    });
  };

  return (
    <>
      <MainButton
        icon={() => <Download />}
        variant="contained"
        disabled={!hasData}
        onClick={() => {
          if (allowFileChange) {
            setOpen(true);
          } else {
            downloadData();
          }
        }}
        disableElevation={false}
      />

      <Modal
        title={
          !displayDataCount
            ? "Download"
            : `Downloading ${Number(displayDataCount).toLocaleString()} rows`
        }
        open={open}
        height="!h-auto"
        onClose={handleClose}
        btnClass="!justify-end"
        actions={[
          {
            icon: () => <Download fontSize="inherit" />,
            ButtonName: "Download",
            onClick: () => {
              if (name) {
                downloadData();
                handleClose();
              }
            },
            disabled: !FormValidationUtils.alphaNumericCombine(name),
          },
        ]}
      >
        <TextField
          value={name}
          onChange={(e) => {
            let value = String(e.target.value).substring(0, 100);
            setName(StringUtils.replaceMultipleSpaces(value));
          }}
          label="File Name"
          required
          fullWidth
          helperText={
            <Translate
              dataKey="Typo.CharCount"
              params={{
                count: 3,
                current: String(name).trim().length,
              }}
            />
          }
          error={!FormValidationUtils.alphaNumericCombine(name)}
        />

        {showPageInfo && (
          <Alert severity="info" className="mt-4">
            <div className="!text-sm">
              {`Downloading records from page ${pageInfo.page} of ${pageInfo.pageCount} pages, maximum of ${pageInfo.limit} records.`}
            </div>
          </Alert>
        )}
      </Modal>
    </>
  );
};
