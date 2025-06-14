/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { get } from "lodash";
import { IconButton, Button as MainButton } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Translate from "../typography/Translate";
import StringUtils from "../../utils/StringUtils";
import Condition from "../commons/Condition";
import DataTableActions from "./DataTableAction";
import DataInput from "./DataInput";
import DataTextArea from "./DataTextArea";
import CustomDate from "../typography/Date";
import HeaderWithDropdown from "./HeaderWithDropdown";
import DateCellRenderer from "../calender/DateCellRenderer";
import CustomColumnsToolPanel from "./CustomColumnsToolPanel";
import useComponentDidMount from "../hooks/useComponentDidMount";
import EmptyData from "../empty/EmptyData";

type RowNode = {
  group?: boolean;
  footer?: boolean;
  allLeafChildren?: Array<{ data: Record<string, any> }>;
};

type ColumnDef = {
  field?: string;
  headerName?: string;
  rowGroup?: boolean;
  cellRenderer?: string;
  editable?: boolean;
  [key: string]: any;
};

type CellRendererParams = {
  value?: any;
  colDef: ColumnDef;
  data?: Record<string, any>;
  node: RowNode;
  rowIndex?: number;
  [key: string]: any;
};

type TableActionsProps = {
  individual?: Array<{
    buttonType?: "Icon" | "Main";
    render?: (args: {
      row: any;
      ActionButton: React.FC<any>;
      key: string;
    }) => React.ReactNode;
    onClick: (row: any) => void;
    [key: string]: any;
  }>;
  list?: any[];
};

type DataTableProps = {
  columns: ColumnDef[];
  rows?: any[];
  emptyProps?: { className?: string };
  emptyIcon?: React.ReactNode;
  onEmptyIcon?: React.ReactNode;
  onEmpty?: React.ReactNode;
  suppressNumberLeft?: boolean;
  tableActions?: TableActionsProps;
  actionRender?: (args: {
    actions: React.ReactNode;
    row: any;
  }) => React.ReactNode;
  sideBarToolParams?: Array<{ id: string; [key: string]: any }>;
};

const DataTable = forwardRef<any, DataTableProps>((props, ref) => {
  const {
    columns,
    rows = [],
    emptyProps = { className: "" },
    emptyIcon,
    onEmptyIcon,
    onEmpty,
    suppressNumberLeft = false,
    tableActions = [],
    actionRender,
    sideBarToolParams = [],
  } = props;

  const reference = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const OnEmpty = useCallback(
    () => (
      <div className={`${emptyProps.className} z-50 w-full p-1 bg-white`}>
        <EmptyData icon={emptyIcon} onEmptyIcon={onEmptyIcon} h="h-full">
          {onEmpty || <Translate dataKey={"Empty.NoRows"} />}
        </EmptyData>
      </div>
    ),
    [onEmpty, emptyProps, emptyIcon, onEmptyIcon]
  );

  const numberFormatted = useCallback(
    (params: CellRendererParams) => {
      const {
        value,
        colDef: { cellRendererParams = {}, editable = false },
      } = params;

      let {
        activeTab,
        decimal = 2,
        isEditable = () => true,
        isRequired = () => false,
      } = cellRendererParams;

      if (
        activeTab === "yield" ||
        params.colDef.cellRenderer === "numberFormattedInteger"
      ) {
        decimal = 0;
      }

      const isEdit = editable && isEditable(params);

      return (
        <div
          className={`flex gap-1 ${
            suppressNumberLeft
              ? "text-right justify-end"
              : "text-left justify-start"
          }`}
        >
          {StringUtils.numberToFixedDecimalLocalString(value, decimal, "")}
          {isEdit && <Edit fontSize="inherit" />}
          {isRequired(params) && <span className="text-red-500">*</span>}
        </div>
      );
    },
    [suppressNumberLeft]
  );

  const TableComponents = useMemo(
    () => ({
      centeredHeader: ({ displayName, value }: any) => (
        <div className="text-center flex-1">{displayName || value}</div>
      ),
      leftHeader: ({ displayName, value }: any) => (
        <div className="text-left flex-1">{displayName || value}</div>
      ),
      sno: ({ rowIndex }: { rowIndex: number }) => rowIndex + 1,
      headerWithDropdown: HeaderWithDropdown,
      capitalize: ({ value }: { value: any }) => {
        if (!value || value === "NA") return StringUtils.noValue();
        return (
          <span className="capitalize">{String(value).toLowerCase()}</span>
        );
      },
      numberFormatted,
      numberFormattedInteger: numberFormatted,
      textField: DataInput,
      dateField: (props: CellRendererParams) => (
        <div className="absolute overflow-visible w-full">
          <DateCellRenderer {...props} />
        </div>
      ),
      dataInput: DataInput,
      percentage: ({ value }: { value: number }) => {
        return `${StringUtils.numberToFixedDecimal(value, 2, true)}%`;
      },
      actions: (row: any) => {
        if (row.node?.group) return null;

        const actions = (
          <div className="text-center flex justify-center h-full">
            <Condition
              show={Array.isArray(tableActions) && tableActions.length > 0}
            >
              {tableActions?.map((props, index) => {
                const { buttonType = "Icon", render, onClick, ...rest } = props;
                const Button = buttonType === "Icon" ? IconButton : MainButton;

                const ActionButton: React.FC<any> = (otherProps) => (
                  <Button
                    {...rest}
                    {...otherProps}
                    onClick={() => onClick(row)}
                    className={`ag-button ${
                      otherProps?.className || rest?.className || ""
                    }`}
                  />
                );

                return render ? (
                  render({ row, ActionButton, key: `${index}` })
                ) : (
                  <ActionButton key={`${index}`} />
                );
              })}
            </Condition>

            <Condition show={tableActions}>
              <DataTableActions actions={tableActions} row={row} />
            </Condition>
          </div>
        );

        return actionRender ? actionRender({ actions, row }) : actions;
      },
      textarea: DataTextArea,
      CustomColumnsToolPanel: CustomColumnsToolPanel,
      groupedValue: (params: CellRendererParams) => {
        const { node, value, colDef: { field, rowGroup } = {} } = params;
        const { footer, allLeafChildren = [] } = node;

        if (footer) {
          const first = get(allLeafChildren, `0.data.${field}`);
          const last = get(
            allLeafChildren,
            `${allLeafChildren.length - 1}.data.${field}`
          );

          if (!rowGroup) {
            if (allLeafChildren.length === 1 && first) return first;
            return "Total";
          }

          if ((!first && !last) || first !== last) return "";
          return first;
        }

        return value;
      },
    }),
    [actionRender, tableActions, numberFormatted]
  );

  useImperativeHandle(ref, () => reference.current);

  useComponentDidMount({
    onMount: () => {
      document.addEventListener("fullscreenchange", () => {});
    },
  });

  return (
    <div ref={containerRef} className="data-table-container">
      <div className="border border-gray-300 rounded p-2">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-medium"
                >
                  {col.headerName || col.field || ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const value = row[col.field ?? ""] ?? "";
                    const CellRenderer =
                      TableComponents[col.cellRenderer || "default"];

                    const cellProps: CellRendererParams = {
                      value,
                      colDef: col,
                      data: row,
                      node: { group: false, footer: false },
                      rowIndex,
                    };

                    return (
                      <td
                        key={colIndex}
                        className="border px-4 py-2 text-gray-700 text-center"
                      >
                        {CellRenderer ? <CellRenderer {...cellProps} /> : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <OnEmpty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DataTable;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, {
//   useState,
//   useRef,
//   useMemo,
//   useCallback,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { get } from "lodash";
// import { IconButton, Button as MainButton } from "@mui/material";
// import Edit from "@mui/icons-material/Edit";
// import Translate from "../typography/Translate";
// import StringUtils from "../../utils/StringUtils";
// import Condition from "../commons/Condition";
// import DataTableActions from "./DataTableAction";
// import DataInput from "./DataInput";
// import DataTextArea from "./DataTextArea";
// import CustomDate from "../typography/Date";
// import HeaderWithDropdown from "./HeaderWithDropdown";
// import DateCellRenderer from "../calender/DateCellRenderer";
// import CustomColumnsToolPanel from "./CustomColumnsToolPanel";
// import useComponentDidMount from "../hooks/useComponentDidMount";
// import EmptyData from "../empty/EmptyData";

// // Type Definitions
// type RowNode = {
//   group?: boolean;
//   footer?: boolean;
//   allLeafChildren?: Array<{ data: Record<string, any> }>;
// };

// type ColumnDef = {
//   field?: string;
//   rowGroup?: boolean;
//   cellRenderer?: string;
//   cellRendererParams?: {
//     activeTab?: string;
//     decimal?: number;
//     isEditable?: (params: CellRendererParams) => boolean;
//     isRequired?: (params: CellRendererParams) => boolean;
//     className?: string;
//     badgeProps?: Record<string, any>;
//     correctionKey?: string;
//   };
//   editable?: boolean;
// };

// type CellRendererParams = {
//   value?: any;
//   colDef: ColumnDef;
//   data?: Record<string, any>;
//   node: RowNode;
//   rowIndex?: number;
//   [key: string]: any;
// };

// type TableActionsProps = {
//   individual: Array<{
//     buttonType?: "Icon" | "Main";
//     render?: (args: {
//       row: any;
//       ActionButton: React.FC<any>;
//       key: string;
//     }) => React.ReactNode;
//     onClick: (row: any) => void;
//     [key: string]: any;
//   }>;
//   list: any[];
// };

// type DataTableProps = {
//   columns: ColumnDef[];
//   emptyProps?: { className?: string };
//   emptyIcon?: React.ReactNode;
//   onEmptyIcon?: React.ReactNode;
//   onEmpty?: React.ReactNode;
//   suppressNumberLeft?: boolean;
//   tableActions: TableActionsProps;
//   actionRender?: (args: {
//     actions: React.ReactNode;
//     row: any;
//   }) => React.ReactNode;
//   sideBar?: any;
//   sideBarToolParams?: Array<{ id: string; [key: string]: any }>;
// };

// const DataTable = forwardRef<any, DataTableProps>((props, ref) => {
//   const {
//     columns,
//     emptyProps = { className: "" },
//     emptyIcon,
//     onEmptyIcon,
//     onEmpty,
//     suppressNumberLeft = false,
//     tableActions,
//     actionRender,
//     sideBarToolParams = [],
//   } = props;

//   const [data, setData] = useState<{ columns: ColumnDef[] }>({ columns: [] });

//   const reference = useRef<any>(null);

//   useEffect(() => {
//     setData({ columns });
//   }, [columns]);

//   const OnEmpty = useCallback(
//     () => (
//       <div className={`${emptyProps.className} z-50 w-full p-1 bg-white`}>
//         <EmptyData icon={emptyIcon} onEmptyIcon={onEmptyIcon} h="h-full">
//           {onEmpty || <Translate dataKey={"Empty.NoRows"} />}
//         </EmptyData>
//       </div>
//     ),
//     [onEmpty, emptyProps, emptyIcon, onEmptyIcon]
//   );

//   const numberFormatted = useCallback(
//     (params: CellRendererParams) => {
//       const {
//         value,
//         colDef: { cellRendererParams = {}, editable = false },
//       } = params;

//       let {
//         activeTab,
//         decimal = 2,
//         isEditable = () => true,
//         isRequired = () => false,
//       } = cellRendererParams;

//       if (
//         activeTab === "yield" ||
//         params.colDef.cellRenderer === "numberFormattedInteger"
//       ) {
//         decimal = 0;
//       }

//       const isEdit = editable && isEditable(params);

//       return (
//         <div
//           className={`flex gap-1 ${
//             suppressNumberLeft
//               ? "text-right justify-end"
//               : "text-left justify-start"
//           }`}
//         >
//           {StringUtils.numberToFixedDecimalLocalString(value, decimal, "")}
//           {isEdit && <Edit fontSize="inherit" />}
//           {isRequired(params) && <span className="text-red-500">*</span>}
//         </div>
//       );
//     },
//     [suppressNumberLeft]
//   );

//   const TableComponents = useMemo(
//     () => ({
//       centeredHeader: ({ displayName, value }: any) => (
//         <div className="text-center flex-1">{displayName || value}</div>
//       ),
//       leftHeader: ({ displayName, value }: any) => (
//         <div className="text-left flex-1">{displayName || value}</div>
//       ),
//       moment: CustomDate,
//       momentDateOnly: (props: CellRendererParams) => (
//         <CustomDate {...props} dateOnly />
//       ),
//       sno: ({ rowIndex }: { rowIndex: number }) => rowIndex + 1,
//       headerWithDropdown: HeaderWithDropdown,
//       capitalize: ({ value }: { value: any }) => {
//         if (!value || value === "NA") return StringUtils.noValue();
//         return (
//           <span className="capitalize">{String(value).toLowerCase()}</span>
//         );
//       },
//       numberFormatted,
//       numberFormattedInteger: numberFormatted,
//       textField: DataInput,
//       dateField: (props: CellRendererParams) => (
//         <div className="absolute overflow-visible w-full">
//           <DateCellRenderer {...props} />
//         </div>
//       ),
//       dataInput: DataInput,
//       percentage: ({ value }: { value: number }) => {
//         return `${StringUtils.numberToFixedDecimal(value, 2, true)}%`;
//       },
//       actions: (row: any) => {
//         if (row.node?.group) return null;

//         const actions = (
//           <div
//             className="text-center flex justify-center h-full"
//             key={"actions"}
//           >
//             <Condition show={Boolean(tableActions.individual.length)}>
//               {tableActions.individual.map((props, index) => {
//                 const { buttonType = "Icon", render, onClick, ...rest } = props;
//                 const Button = buttonType === "Icon" ? IconButton : MainButton;

//                 const ActionButton: React.FC<any> = (otherProps) => (
//                   <Button
//                     {...rest}
//                     {...otherProps}
//                     onClick={() => onClick(row)}
//                     className={`ag-button ${
//                       otherProps?.className || rest?.className || ""
//                     }`}
//                   />
//                 );

//                 return render ? (
//                   render({ row, ActionButton, key: `${index}` })
//                 ) : (
//                   <ActionButton key={`${index}`} />
//                 );
//               })}
//             </Condition>

//             <Condition show={Boolean(tableActions.list.length)}>
//               <DataTableActions actions={tableActions.list} row={row} />
//             </Condition>
//           </div>
//         );

//         return actionRender ? actionRender({ actions, row }) : actions;
//       },
//       textarea: DataTextArea,
//       CustomColumnsToolPanel: CustomColumnsToolPanel,
//       groupedValue: (params: CellRendererParams) => {
//         const { node, value, colDef: { field, rowGroup } = {} } = params;
//         const { footer, allLeafChildren = [] } = node;

//         if (footer) {
//           const first = get(allLeafChildren, `0.data.${field}`);
//           const last = get(
//             allLeafChildren,
//             `${allLeafChildren.length - 1}.data.${field}`
//           );

//           if (!rowGroup) {
//             if (allLeafChildren.length === 1 && first) return first;
//             return "Total";
//           }

//           if ((!first && !last) || first !== last) return "";
//           return first;
//         }

//         return value;
//       },
//     }),
//     [actionRender, tableActions, numberFormatted]
//   );

//   useImperativeHandle(ref, () => reference.current);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useComponentDidMount({
//     onMount: () => {
//       document.addEventListener("fullscreenchange", () => {});
//     },
//   });

//   return (
//     <div ref={containerRef} className="data-table-container">
//       <div className="border border-gray-300 rounded p-2">
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               {data.columns.map((col, index) => (
//                 <th
//                   key={index}
//                   className="border border-gray-300 px-4 py-2 text-left font-medium"
//                 >
//                   {col.headerName || col.field || ""}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {data.columns.map((_, index) => (
//                 <td key={index} className="border px-4 py-2 text-gray-700">
//                   Sample Data
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>

//         {/* Show empty state conditionally (e.g. if data length === 0) */}
//         <div className="mt-4">
//           <OnEmpty />
//         </div>
//       </div>
//     </div>
//   );
// });

// export default DataTable;

// import { observer } from "mobx-react-lite";
// import { t } from "i18next";
// import { DataTable } from "../../components/table";
// import { Translate } from "../../components/Typography";
// import { useComponentDidMount, useQuaterisation } from "../../hooks";

// export const QuaterisationTable = observer(() => {
//   const {
//     monthsList,
//     loadMonthsDropdown,
//     isDisabledEndMonth,
//     isDisabledEndWeek,
//     valueSetter,
//     data = [],
//     isLoading = false,
//     getEndWeeks,
//     getEndMonths,
//     isValidValue,
//     DeleteQuaterisationTable,
//   } = useQuaterisation();

//   useComponentDidMount({
//     onMount: () => {
//       loadMonthsDropdown();
//     },
//   });

//   return (
//     <>
//       <DataTable
//         defaultColDefination={{
//           sortable: false,
//           resizable: false,
//         }}
//         loading={isLoading}
//         data={data}
//         sideBar={false}
//         columns={[
//           {
//             field: "cropName",
//             headerName: t("Columns.CropNames"),
//             sortable: true,
//             searchable: true,
//             cellRenderer: (data) => {
//               return (
//                 <div className="break-normal !capitalize">
//                   {String(data.value).toLowerCase()}
//                 </div>
//               );
//             },
//             minWidth: 200,
//           },
//           {
//             field: "Start_Month",
//             headerName: t("Columns.StartMonth"),
//             cellRenderer: "headerWithDropdown",
//             minWidth: 200,
//             headerComponentParams: {
//               placeholder: t("Placeholder.EnterStartMonth"),
//               data: monthsList,
//               dataID: "month_name",
//               dataValue: "month_name",
//               className: "!w-full mb-1",
//               onChange: (e, props) => {
//                 valueSetter({
//                   ...props,
//                   newValue: e.target.value,
//                 });
//               },
//               labelSize: 12,
//               inputSize: 12,
//             },
//           },
//           {
//             field: "Start_Week",
//             headerName: t("Columns.StartWeek"),
//             cellRenderer: "headerWithDropdown",
//             minWidth: 200,
//             headerComponentParams: {
//               placeholder: t("Placeholder.EnterStartWeek"),
//               className: "!w-full mb-1",
//               data: getEndWeeks(),
//               onChange: (e, props) => {
//                 valueSetter({
//                   ...props,
//                   newValue: e.target.value,
//                 });
//               },
//               labelSize: 12,
//               inputSize: 12,
//               dynamicProps: (props) => {
//                 const disabled = !isValidValue(props.data.Start_Month);

//                 return {
//                   disabled,
//                   error: !disabled && !props.value,
//                 };
//               },
//             },
//           },
//           {
//             field: "End_Month",
//             headerName: t("Columns.EndMonth"),
//             cellRenderer: "headerWithDropdown",
//             minWidth: 200,
//             headerComponentParams: {
//               placeholder: t("Placeholder.EnterEndMonth"),
//               dynamicProps: (props) => {
//                 const disabled = isDisabledEndMonth(props);
//                 return {
//                   disabled,
//                   data: getEndMonths(props.data),
//                   error: !disabled && !props.value,
//                 };
//               },
//               dataID: "month_name",
//               dataValue: "month_name",
//               className: "!w-full mb-1",
//               onChange: (e, props) => {
//                 valueSetter({
//                   ...props,
//                   newValue: e.target.value,
//                 });
//               },
//               labelSize: 12,
//               inputSize: 12,
//             },
//           },
//           {
//             field: "End_Week",
//             headerName: t("Columns.EndWeek"),
//             cellRenderer: "headerWithDropdown",
//             minWidth: 200,
//             headerComponentParams: {
//               placeholder: t("Placeholder.EnterEndWeek"),
//               className: "!w-full mb-1",
//               onChange: (e, props) => {
//                 valueSetter({
//                   ...props,
//                   newValue: e.target.value,
//                 });
//               },
//               labelSize: 12,
//               inputSize: 12,
//               dynamicProps: (props) => {
//                 const disabled = isDisabledEndWeek(props);
//                 return {
//                   disabled,
//                   data: getEndWeeks(props.data, true),
//                   error: !disabled && !props.value,
//                 };
//               },
//             },
//           },
//           {
//             headerName: t("Columns.Actions"),
//             headerComponent: "centeredHeader",
//             cellRenderer: "actions",
//             sortable: false,
//             minWidth: 80,
//             pinned: "right",
//             maxWidth: 100,
//           },
//         ]}
//         actions={[
//           {
//             icon: "DeleteIcon",
//             actionType: "confirm",
//             tooltip: "Action.Delete",
//             individual: true,
//             className: "!mr-2",
//             size: "small",
//             render: ({ row, ActionButton, key }) => {
//               const isRowIncomplete =
//                 !row.data.Start_Month ||
//                 !row.data.Start_Week ||
//                 !row.data.End_Month ||
//                 !row.data.End_Week;
//               return <ActionButton disabled={isRowIncomplete} key={key} />;
//             },
//             confirm: {
//               title: "Action.Delete",
//               content: (row) => (
//                 <Translate
//                   dataKey={"Confirm.Action"}
//                   params={{
//                     action: `${t("Action.Delete")}, ${row.data.cropName}`,
//                   }}
//                   htmlContent
//                 />
//               ),
//               actions: [
//                 {
//                   text: "Action.No",
//                   type: "primary",
//                   variant: "outlined",
//                 },
//                 {
//                   text: "Action.Delete",
//                   type: "error",
//                   onClick: ({ data } = {}) => {
//                     DeleteQuaterisationTable(data.cropName);
//                   },
//                 },
//               ],
//             },
//           },
//         ]}
//         onEmpty={
//           <div className="ml-4">
//             <Translate dataKey={"Empty.NoRows"} />
//           </div>
//         }
//         pagination={true}
//         paginationPageSize={10}
//       />
//     </>
//   );
// });

// import { observer } from "mobx-react-lite";
// import { t } from "i18next";

// import { DataTable } from "../../components/table";
// import { Translate } from "../../components/Typography";
// import ApiCallInProgress from "../../components/alert/ApiCallInProgress";
// import { useSourceUpload } from "../../hooks";
// import { AlertMessage } from "../../components/alert";
// import SourceUploadFilters from "../../features/sourceupload-features/SourceUploadFilters";
// import { DefaultValues } from "../../constants";

// export const SourceUploadTable = observer(() => {
//   const { apiStatus, tableData = [], RowEdit } = useSourceUpload();
//   return (
//     <>
//       <ApiCallInProgress loading={apiStatus.loadingItems} />
//       <AlertMessage
//         {...apiStatus}
//         message="File not available for download"
//         onlyErrors
//         snackbar
//       />
//       <DataTable
//         serialNumbers
//         height={450}
//         columns={[
//           {
//             field: "agencyFilename",
//             headerName: "File Name",
//             searchable: true,
//             minWidth: 100,
//           },
//           {
//             field: "createdDate",
//             headerName: "Submitted date",
//             searchable: true,
//             cellRenderer: "moment",
//             minWidth: 100,
//           },

//           {
//             field: "createdBy",
//             headerName: "Uploaded by",
//             searchable: true,
//             minWidth: 100,
//           },
//           {
//             field: "etlStatus",
//             headerName: "Process Status",
//             searchable: true,
//             minWidth: 100,
//           },
//           {
//             field: "actions",
//             headerName: t("Columns.Actions"),
//             headerComponent: "centeredHeader",
//             cellRenderer: "actions",
//             sortable: false,
//             minWidth: 100,
//             maxWidth: 100,
//           },
//         ]}
//         data={tableData}
//         actions={[
//           {
//             icon: "Download",
//             title: "Download",
//             individual: true,
//             onClick: ({ data }) => {
//               RowEdit(data);
//             },
//             render: ({ row: { data }, ActionButton, key }) => {
//               return (
//                 <ActionButton
//                   key={key}
//                   disabled={
//                     !Boolean(data.uploadStatus === DefaultValues.SuccessStatus)
//                   }
//                   tooltip={
//                     data.uploadStatus === DefaultValues.SuccessStatus
//                       ? "Download"
//                       : "Upload Failed"
//                   }
//                 />
//               );
//             },
//           },
//         ]}
//         onEmpty={
//           <div className="ml-4">
//             <Translate dataKey={"Empty.NoRows"} />
//           </div>
//         }
//         tableFilters={[<SourceUploadFilters />]}
//         flatFilters
//       />
//     </>
//   );
// });

// export default SourceUploadTable;

// import { t } from "i18next";
// import { observer } from "mobx-react-lite";
// import { DataTable } from "../../components/table";
// import { Translate } from "../../components/Typography";
// import { useStorageFormStore } from "../../hooks";
// import { ArrayUtils, Profile } from "../../utils";
// import { ALL_INDIA_STATE_KEY, SitePermissions } from "../../constants";

// export const StorageFormTable = observer(() => {
//   const { storageData, onRowEdit, isLoadingData, storageFooter } =
//     useStorageFormStore();
//   return (
//     <DataTable
//       serialNumbers
//       loading={isLoadingData}
//       columns={[
//         ...ArrayUtils.addWhen(
//           {
//             field: "statename",
//             headerName: t("Typo.StateName"),
//             minWidth: 120,
//           },
//           Profile.isPowerUser
//         ),
//         {
//           field: "production",
//           headerName: t("Columns.Production"),
//           searchable: true,
//           minWidth: 100,
//         },
//         {
//           field: "storagecapacity",
//           headerName: t("Columns.StorageCapacity"),
//           searchable: true,
//           minWidth: 100,
//         },
//         {
//           field: "totalquantitystored",
//           headerName: t("Columns.TotalQuantityStored"),
//           searchable: true,
//           minWidth: 100,
//         },
//         {
//           field: "quantityreleased",
//           headerName: t("Columns.QuantityReleased"),
//           searchable: true,
//           minWidth: 100,
//         },
//         {
//           field: "quantitydamaged",
//           headerName: t("Columns.QuantityDamaged"),
//           searchable: true,
//           minWidth: 100,
//         },
//         {
//           field: "createddate",
//           headerName: t("Columns.Dateason"),
//           minWidth: 100,
//           cellRenderer: "momentDateOnly",
//           searchable: true,
//         },
//         ...ArrayUtils.addWhen(
//           {
//             field: "actions",
//             headerName: t("Columns.Actions"),
//             headerComponent: "centeredHeader",
//             cellRenderer: "actions",
//             sortable: false,
//             minWidth: 100,
//             maxWidth: 100,
//           },
//           Profile.isPowerUser
//         ),
//       ]}
//       data={storageData}
//       footerRows={storageFooter}
//       onEmpty={
//         <div className="ml-4">
//           <Translate dataKey={"Empty.NoRows"} />
//         </div>
//       }
//       pagination={true}
//       paginationPageSize={10}
//       actions={[
//         {
//           icon: "EditIcon",
//           onClick: ({ data }) => {
//             onRowEdit(data);
//           },
//           tooltip: "Action.Edit",
//           individual: true,
//           className: "!mr-2",
//           size: "small",
//           permissions: {
//             p: SitePermissions.PagePermissions.HORTICULTURE_TOPCROPDATA,
//             a: [SitePermissions.PageActions.EDIT_STORAGE],
//           },
//           render: ({ row: { data }, ActionButton, key }) => {
//             if (data?.statekey === ALL_INDIA_STATE_KEY) {
//               return null;
//             }
//             return <ActionButton key={key} />;
//           },
//         },
//       ]}
//     />
//   );
// });

// export default StorageFormTable;

// import { colors } from "@mui/material";
// import { DataTable } from "../../components/table";
// import NumberEditor from "../../components/table/cell-editor/Numeric";
// import { ArrayUtils, StringUtils } from "../../utils";
// import { CellHighlight } from "../../features/query-report/CellHighlight";
// import {
//   CROP_WISE,
//   DefaultValues,
//   LOCATION_WISE,
//   // Published,
// } from "../../constants";
// import Help from "@mui/icons-material/Help";
// import { useMemo } from "react";
// const cellClass = "!font-bold !bg-green-50";

// export const AreaDistrictApyTable = ({
//   data = [],
//   valueSetter,
//   isEditable,
//   isLoading = false,
//   footer = [],
//   canEdit = false,
//   reportType = CROP_WISE,
//   preview = false,
// }) => {
//   const columns = useMemo(() => {
//     const DistrictColumn = {
//       headerName: "District",
//       field: "districtname",
//       maxWidth: 150,
//       minWidth: 150,
//       cellRenderer: "capitalize",
//     };

//     const CropColumn = {
//       headerName: "Crop",
//       field: "cropname",
//       maxWidth: 120,
//       minWidth: 120,
//       cellRenderer: "capitalize",
//     };

//     return [
//       ...ArrayUtils.addWhen(
//         [DistrictColumn],
//         reportType === CROP_WISE,
//         false,
//         []
//       ),
//       ...ArrayUtils.addWhen(
//         [DistrictColumn, CropColumn],
//         reportType === LOCATION_WISE,
//         false,
//         []
//       ),
//       ...ArrayUtils.addWhen(
//         [
//           {
//             field: "status",
//             headerComponent: "centeredHeader",
//             cellRenderer: "badge",
//             sortable: true,
//             cellRendererParams: {
//               checkPublish: true,
//               className: "!text-xxs !p-0.5",
//               badgeProps: {
//                 keepStatus: true,
//                 color: {
//                   verified: "done",
//                 },
//               },
//               correctionKey: "correctionsremarks",
//             },
//             minWidth: 155,
//             maxWidth: 155,
//           },
//           {
//             headerName: "Digital Crop Survey",
//             children: [
//               {
//                 headerName: "Irrigated",
//                 field: "dcs_irrigated",
//                 cellRenderer: "numberFormatted",
//                 cellRendererParams: {
//                   search: false,
//                 },
//                 minWidth: 100,
//               },
//               {
//                 headerName: "Rainfed",
//                 field: "dcs_rainfed",
//                 cellRenderer: "numberFormatted",
//                 cellRendererParams: {
//                   search: false,
//                 },
//                 minWidth: 100,
//               },
//               {
//                 headerName: "Total",
//                 field: "dcs_total",
//                 cellRenderer: (params) => {
//                   const {
//                     value,
//                     colDef: {
//                       cellRendererParams: { highlight = {} },
//                     },
//                     data,
//                   } = params;

//                   return (
//                     <CellHighlight highlight={highlight} data={data}>
//                       {StringUtils.numberToFixedDecimalLocalString(value, 2)}
//                     </CellHighlight>
//                   );
//                 },
//                 cellClass,
//                 cellRendererParams: {
//                   highlight: DefaultValues.DCS_HIGHLIGHT,
//                   search: false,
//                 },
//                 minWidth: 100,
//               },
//             ],
//           },
//           {
//             headerName: "Remote Sensing",
//             headerClass: "ag-group-text-wrap",
//             children: [
//               {
//                 field: "mnfc",
//                 cellRenderer: "numberFormatted",
//                 headerName: "Reported Area",
//                 cellRendererParams: {
//                   search: false,
//                 },
//                 minWidth: 100,
//               },
//             ],
//           },
//         ],
//         !preview,
//         false,
//         []
//       ),
//       {
//         headerName: "State Final",
//         children: [
//           {
//             headerName: "Irrigated",
//             field: "irrigated",
//             cellRenderer: "numberFormatted",
//             singleClickEdit: true,
//             cellEditor: NumberEditor,
//             editable: isEditable,
//             cellRendererParams: {
//               decimal: 3,
//               isEditable,
//               search: false,
//               // lockKey: "status",
//               // lockValue: Published,
//             },
//             valueSetter,
//             minWidth: 100,
//           },
//           {
//             headerName: "Rainfed",
//             field: "rainfed",
//             cellRenderer: "numberFormatted",
//             singleClickEdit: true,
//             cellEditor: NumberEditor,
//             editable: isEditable,
//             cellRendererParams: {
//               decimal: 3,
//               isEditable,
//               search: false,
//               // lockKey: "status",
//               // lockValue: Published,
//             },
//             valueSetter,
//             minWidth: 100,
//           },
//           {
//             headerName: "Total",
//             field: "total",
//             cellRenderer: "numberFormatted",
//             singleClickEdit: true,
//             cellEditor: NumberEditor,
//             editable: isEditable,
//             cellRendererParams: {
//               decimal: 3,
//               isEditable,
//               search: false,
//               // lockKey: "status",
//               // lockValue: Published,
//             },
//             valueSetter,
//             cellClass,
//             minWidth: 100,
//           },
//         ],
//       },
//       {
//         headerName: "Remarks",
//         field: "remarks",
//         ...ArrayUtils.addWhen(
//           {
//             cellRenderer: "textarea",
//             isEditable,
//           },
//           canEdit,
//           false
//         ),
//         maxWidth: 200,
//         minWidth: 200,
//         cellRendererParams: {
//           onApply: valueSetter,
//           hideOnFooter: true,
//           search: false,
//         },
//       },
//     ];
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [canEdit, isEditable, reportType, preview]);

//   return (
//     <DataTable
//       defaultColDefination={{
//         sortable: false,
//         resizable: false,
//       }}
//       height={preview ? 300 : 400}
//       footerRows={footer}
//       loading={isLoading}
//       rowStyles={(params) => {
//         const { data = {} } = params;
//         if (data.isTotalRow) {
//           return { background: colors.yellow[100] };
//         }

//         if (params.data?.rowEdited && !preview) {
//           return { background: colors.green[100] };
//         }

//         return {};
//       }}
//       data={data}
//       sideBar={false}
//       columns={columns}
//       tableFilters={
//         !preview && [
//           <div
//             className="!text-xs font-semibold text-sky-900 flex items-center gap-1"
//             key={"message"}
//           >
//             <Help fontSize="inherit" />
//             <div>
//               Default values are from DCS and can be edited by the state
//             </div>
//           </div>,
//         ]
//       }
//     />
//   );
// };
