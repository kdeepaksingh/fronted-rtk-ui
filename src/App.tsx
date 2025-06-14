/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import AgGridTable from "./AgGridTable";
import DataTable from "./components/table/DataTable";
import { Delete, Edit, EditNotifications } from "@mui/icons-material";
import { useRef } from "react";
function App() {
  const dataTableRef = useRef(null);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "actions",
      sortable: false,
      filter: false,
    },
  ];

  const rows = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  const tableActions = {
    individual: [
      {
        icon: <EditNotifications fontSize="small" />,
        onClick: (row: any) => alert(`Edit ${row.name}`),
        buttonType: "Icon",
        title: "Edit",
      },
      {
        icon: <Delete fontSize="small" />,
        onClick: (row: any) => alert(`Delete ${row.name}`),
        buttonType: "Icon",
        title: "Delete",
      },
    ],
    list: [],
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Static Data Table Example</h1>
      <DataTable columns={columns} rows={rows} tableActions={tableActions} />
    </div>
  );
}

export default App;
