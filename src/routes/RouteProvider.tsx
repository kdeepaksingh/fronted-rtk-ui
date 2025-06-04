import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([PublicRoutes, PrivateRoutes]);

const RouteProvider = () => <RouterProvider router={router} />;

export default RouteProvider;
