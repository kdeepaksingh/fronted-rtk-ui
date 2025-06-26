import { lazy, Suspense, type ReactNode } from "react";
import Url from "../components/constants/Url";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import PageLoader from "../components/loader/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeesDetails from "../pages/employees/EmployeesDetails";
import AttendanceDetails from "../pages/attendance/AttendanceDetails";
import PayrollDetails from "../pages/payroll/PayrollDetails";
import PerformanceRecords from "../pages/performance/PerformanceRecords";
import TeamManagement from "../pages/team-management/TeamManagement";
import NotificationDetails from "../pages/notification/NotificationDetails";
import TasksAndProject from "../pages/tasks-projects/TasksAndProject";
import FeedbackDetails from "../pages/feedback/FeedbackDetails";
import IDCards from "../pages/id-card/IDCards";
import LeaveRequests from "../pages/leaves/LeaveRequests";
import UserProfile from "../pages/profile/UserProfile";

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
      path: Url.UserProfile,
      element: (
        <Suspend>
          <UserProfile />
        </Suspend>
      ),
    },
    { path: "dashboard", element: <h1>Dashboard component</h1> },
    { path: "*", element: <PageNotFound /> },
  ],
};

export default PrivateRoutes;
