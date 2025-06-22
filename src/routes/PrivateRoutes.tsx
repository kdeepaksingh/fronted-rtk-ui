import { lazy, Suspense, type ReactNode } from "react";
import Url from "../components/constants/Url";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";

const DashCard = lazy(() => import("../pages/dashboard/DashCard"));
const ApplyLeaves = lazy(() => import("../pages/leaves/ApplyLeaves"));

export const Suspend = ({ children }: SuspendProps) => (
  <Suspense fallback={<PageLoader showLogo={false} />}>{children}</Suspense>
);

type SuspendProps = {
  children: ReactNode;
};
const PrivateRoutes = {
  path: `${Url.Dashboard}`,
  element: <DashboardLayout />,
  errorElement: <PageNotFound />,
  children: [
    {
      index: true,
      element: (
        <Suspend>
          <DashCard />
        </Suspend>
      ),
    },
    {
      path: Url.Leaves,
      element: (
        <Suspend>
          <ApplyLeaves />
        </Suspend>
      ),
    },
    { path: "dashboard", element: <h1>Dashboard component</h1> },
    { path: "profile", element: <h1>Profile component</h1> },
    { path: "*", element: <PageNotFound /> },
  ],
};

export default PrivateRoutes;
