import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicLayout from "../layouts/PublicLayout";

const RouteProvider = ({ setMode }: any) => {
  const router = createBrowserRouter([
    {
      ...PublicRoutes,
      element: <PublicLayout setMode={setMode} />, // ✅ CRITICAL
    },
    PrivateRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default RouteProvider;

// const router = createBrowserRouter([PublicRoutes, PrivateRoutes]);

// const RouteProvider = () => <RouterProvider router={router} />;

// export default RouteProvider;
