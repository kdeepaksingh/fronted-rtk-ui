import { Navigate } from "react-router-dom";

const PrivateRoutes = {
  path: "/",
  element: "",
  children: [
    { path: "dashboard", element: <h1>Dashboard component</h1> },
    { path: "profile", element: <h1>Profile component</h1> },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ],
};

export default PrivateRoutes;
