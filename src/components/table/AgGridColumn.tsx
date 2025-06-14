import type { FC } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

interface AgColumnProps {
  columns?: ColDef[];
  height?: number;
}

export const AgGridColumn: FC<AgColumnProps> = ({
  columns = [],
  height = 400,
}) => (
  <div className="ag-theme-alpine only-column-filter" style={{ height }}>
    <AgGridReact
      domLayout="normal"
      columnDefs={columns}
      rowData={[]}
      sideBar={{
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Table Filters",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivotMode: true,
            },
          },
        ],
        defaultToolPanel: "columns",
      }}
    />
  </div>
);
