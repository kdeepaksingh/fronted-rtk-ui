import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import PublicLayout from "../layouts/PublicLayout";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";
import Url from "../components/constants/Url";

const LoginForm = lazy(() => import("../pages/auth/Login"));
const RegisterForm = lazy(() => import("../pages/auth/Register"));
const LandingTemplate = lazy(() => import("../pages/home/LandingPage"));
const AboutUs = lazy(() => import("../pages/home/about/AboutUs"));
const ContactUs = lazy(() => import("../pages/home/contact-us/ContactUs"));
const Services = lazy(() => import("../pages/home/services/Services"));
const Features = lazy(() => import("../pages/home/feature/Feature"));
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
          <LandingTemplate />
        </Suspend>
      ),
    },
    {
      path: `${Url.Auth.Login}`,
      element: <LoginForm />,
    },
    {
      path: `${Url.Auth.Register}`,
      element: <RegisterForm />,
    },
    {
      path: `${Url.Auth.AboutUs}`,
      element: <AboutUs />,
    },
    {
      path: `${Url.Auth.Feature}`,
      element: <Features />,
    },
    {
      path: `${Url.Auth.Services}`,
      element: <Services />,
    },
    {
      path: `${Url.Auth.ContactUs}`,
      element: <ContactUs />,
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
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default PublicRoutes;
