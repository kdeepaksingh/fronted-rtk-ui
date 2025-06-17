import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import PublicLayout from "../layouts/PublicLayout";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";
import Url from "../components/constants/Url";

const LoginForm = lazy(() => import("../pages/auth/Login"));
const RegisterForm = lazy(() => import("../pages/auth/Register"));
const ScreenReaderAccess = lazy(
  () => import("../pages/screen-reader/ScreenReaderAccess")
);

type SuspendProps = {
  children: ReactNode;
};

export const Suspend = ({ children }: SuspendProps) => (
  <Suspense fallback={<PageLoader showLogo={false} />}>{children}</Suspense>
);

const PublicRoutes = {
  path: Url.Home,
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
      path: `${Url.Auth.Login}`,
      element: <LoginForm />,
    },
    {
      path: Url.ScreenReaderAccess,
      element: (
        <Suspend>
          <ScreenReaderAccess />
        </Suspend>
      ),
    },
    {
      path: `${Url.Auth.Register}`,
      element: <RegisterForm />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default PublicRoutes;
