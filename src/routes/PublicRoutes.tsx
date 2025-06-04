import { Suspense } from "react";
import type { ReactNode } from "react";
import PublicLayout from "../layouts/PublicLayout";

type SuspendProps = {
  children: ReactNode;
};

export const Suspend = ({ children }: SuspendProps) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const PublicRoutes = {
  path: "/",
  element: <PublicLayout />,
  errorElement: <h1>Page Not Found</h1>,
  children: [
    {
      index: true,
      element: (
        <Suspend>
          <h1>Login component here</h1>
        </Suspend>
      ),
    },
    {
      path: "register",
      element: <h1>Registration component here</h1>,
    },
    {
      path: "*",
      element: <h1>Page Not found!</h1>,
    },
  ],
};

export default PublicRoutes;
