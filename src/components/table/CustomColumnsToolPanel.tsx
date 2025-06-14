import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { ColDef, GridApi } from "ag-grid-community";
import { ColumnApi } from "ag-grid-community";

type CustomColumnsToolPanelProps = {
  api: GridApi;
};

export const CustomColumnsToolPanel = ({
  api,
}: CustomColumnsToolPanelProps) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    setColumnDefs(api.getColumnDefs() || []);
  }, [api]);

  const onFilterChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value;
    api.getQuickFilter(filterText);
  };

  const onColumnToggle = (field?: string) => {
    if (!field) return;
    const columnApi: ColumnApi = api.getColumn();
    const column = columnApi.getColumn(field);

    if (column) {
      const currentlyVisible = column.isVisible();
      columnApi.setColumnVisible(field, !currentlyVisible);
      setColumnDefs((prevDefs) =>
        prevDefs.map((def) =>
          def.field === field ? { ...def, hide: currentlyVisible } : def
        )
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search columns"
        onChange={onFilterChanged}
        className="mb-2 p-1 border border-gray-300 rounded w-full"
      />
      <ul>
        {columnDefs.map((columnDef) => (
          <li key={columnDef.field}>
            <label>
              <input
                type="checkbox"
                checked={!columnDef.hide}
                onChange={() => onColumnToggle(columnDef.field)}
              />
              {columnDef.headerName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomColumnsToolPanel;
