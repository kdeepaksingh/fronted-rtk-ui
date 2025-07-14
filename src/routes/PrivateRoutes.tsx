import { lazy, Suspense, type ReactNode } from "react";
import Url from "../components/constants/Url";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";

const DashCard = lazy(() => import("../pages/dashboard/DashCard"));
const ApplyLeaves = lazy(() => import("../pages/leaves/ApplyLeaves"));
const LeaveHistory = lazy(() => import("../pages/leaves/LeaveHistory"));
const LeaveManagement = lazy(() => import("../pages/leaves/LeaveManagement"));
const Settings = lazy(() => import("../pages/setting/Setting"));
const UserProfile = lazy(() => import("../pages/profile/UserProfile"));
const LeaveRequests = lazy(() => import("../pages/leaves/LeaveRequests"));
const IDCards = lazy(() => import("../pages/id-card/IDCards"));
const FeedbackDetails = lazy(() => import("../pages/feedback/FeedbackDetails"));
const TasksAndProject = lazy(
  () => import("../pages/tasks-projects/TasksAndProject")
);
const NotificationDetails = lazy(
  () => import("../pages/notification/NotificationDetails")
);
const TeamManagement = lazy(
  () => import("../pages/team-management/TeamManagement")
);
const PerformanceRecords = lazy(
  () => import("../pages/performance/PerformanceRecords")
);
const PayrollDetails = lazy(() => import("../pages/payroll/PayrollDetails"));
const AttendanceDetails = lazy(
  () => import("../pages/attendance/AttendanceDetails")
);
const EmployeesDetails = lazy(
  () => import("../pages/employees/EmployeesDetails")
);
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));

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
      path: Url.ApplyLeaves,
      element: (
        <Suspend>
          <ApplyLeaves />
        </Suspend>
      ),
    },
    {
      path: Url.Employees,
      element: (
        <Suspend>
          <EmployeesDetails />
        </Suspend>
      ),
    },
    {
      path: Url.Attendance,
      element: (
        <Suspend>
          <AttendanceDetails />
        </Suspend>
      ),
    },
    {
      path: Url.Payroll,
      element: (
        <Suspend>
          <PayrollDetails />
        </Suspend>
      ),
    },
    {
      path: Url.Performance,
      element: (
        <Suspend>
          <PerformanceRecords />
        </Suspend>
      ),
    },
    {
      path: Url.TeamManagement,
      element: (
        <Suspend>
          <TeamManagement />
        </Suspend>
      ),
    },
    {
      path: Url.IDCard,
      element: (
        <Suspend>
          <IDCards />
        </Suspend>
      ),
    },
    {
      path: Url.Notifications,
      element: (
        <Suspend>
          <NotificationDetails />
        </Suspend>
      ),
    },
    {
      path: Url.TasksAndProjects,
      element: (
        <Suspend>
          <TasksAndProject />
        </Suspend>
      ),
    },
    {
      path: Url.Feedback,
      element: (
        <Suspend>
          <FeedbackDetails />
        </Suspend>
      ),
    },
    {
      path: Url.LeaveRequest,
      element: (
        <Suspend>
          <LeaveRequests />
        </Suspend>
      ),
    },
    {
      path: Url.LeaveHistory,
      element: (
        <Suspend>
          <LeaveHistory />
        </Suspend>
      ),
    },
    {
      path: Url.UserProfile,
      element: (
        <Suspend>
          <UserProfile />
        </Suspend>
      ),
    },
    {
      path: Url.Settings,
      element: (
        <Suspend>
          <Settings />
        </Suspend>
      ),
    },
    {
      path: Url.LeaveManagement,
      element: (
        <Suspend>
          <LeaveManagement />
        </Suspend>
      ),
    },
    {
      path: Url.Dashboard,
      element: (
        <Suspend>
          <DashCard />
        </Suspend>
      ),
    },
    // { path: "dashboard", element: <h1>Dashboard component</h1> },
    { path: "*", element: <PageNotFound /> },
  ],
};

export default PrivateRoutes;
