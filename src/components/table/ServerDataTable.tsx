/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";

interface ServerDataTableProps {
  fetchData: () => Promise<{ data: any[] }>;
  columns: ColDef[];
  defaultColDef?: ColDef;
  height?: string;
  theme?: string;
  className?: string;
}

export const ServerDataTable: React.FC<ServerDataTableProps> = ({
  fetchData = async () => ({ data: [] }),
  columns = [],
  defaultColDef = {},
  height = "77vh",
  theme = "balham",
  className = "",
}) => {
  const [rowData, setRowData] = useState<any[]>([]);

  const onGridReady = useCallback(
    async (params: GridReadyEvent) => {
      params.api.showLoadingOverlay();
      try {
        const { data } = await fetchData();
        setRowData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        params.api.hideOverlay();
      }
    },
    [fetchData]
  );

  return (
    <div className={`ag-theme-${theme} ${className}`} style={{ height }}>
      <AgGridReact
        columnDefs={columns}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={onGridReady}
      />
    </div>
  );
};

// import API from "../../services";
// import { ServerDataTable } from "../table/ServerDataTable";
// import CommonUtils from "../../utils/CommonUtils";

// export const SpicesSugar = () => {
//   return (
//     <ServerDataTable
//       fetchData={API.Calender.getSpiceSugar}
//       className="!text-xs gridFont font-upag-open-sans"
//       theme="balham"
//       columns={[
//         {
//           field: "Commodity",
//           headerName: "Commodity",
//           maxWidth: 140,
//           searchable: true,
//           pinned: "left",
//           filter: "agTextColumnFilter",
//           headerClass: "crop-cal",
//         },
//         {
//           field: "Country",
//           headerName: "Country",
//           maxWidth: 110,
//           searchable: true,
//           pinned: "left",
//           filter: "agTextColumnFilter",
//           headerClass: "crop-cal",
//         },
//         {
//           field: "January",
//           headerName: "Jan",
//           searchable: true,
//           maxWidth: 75,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "February",
//           headerName: "Feb",
//           searchable: true,
//           maxWidth: 75,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "March",
//           headerName: "Mar",
//           searchable: true,
//           maxWidth: 75,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "April",
//           headerName: "Apr",
//           searchable: true,
//           maxWidth: 75,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "May",
//           headerName: "May",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "June",
//           headerName: "Jun",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "July",
//           headerName: "Jul",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "August",
//           headerName: "Aug",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "September",
//           headerName: "Sept",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "October",
//           headerName: "Oct",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "November",
//           headerName: "Nov",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//         {
//           field: "December",
//           headerName: "Dec",
//           maxWidth: 75,
//           searchable: true,
//           filter: false,
//           headerClass: "crop-cal",
//         },
//       ]}
//       defaultColDef={{
//         cellStyle: (params) => {
//           return CommonUtils.getCellStyleByCropPeriod(params);
//         },
//         filter: true,
//         floatingFilter: true,
//       }}
//     />
//   );
// };

// export default SpicesSugar;
