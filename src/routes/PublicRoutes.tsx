import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import PublicLayout from "../layouts/PublicLayout";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";

const LoginForm = lazy(() => import('../pages/auth/Login'));

type SuspendProps = {
  children: ReactNode;
};

export const Suspend = ({ children }: SuspendProps) => (
  <Suspense fallback={<PageLoader showLogo={false} />}>{children}</Suspense>
);

const PublicRoutes = {
  path: "/",
  element: <PublicLayout />,
  errorElement: <PageNotFound />,
  children: [
    {
      index: true,
      element: (
        <Suspend>
          <LoginForm />
        </Suspend>
      ),
    },
    {
      path: "register",
      element: <h1>Registration component here</h1>,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default PublicRoutes;
