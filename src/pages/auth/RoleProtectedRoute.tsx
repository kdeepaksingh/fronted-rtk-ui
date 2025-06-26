import { Navigate, Outlet } from "react-router-dom";

// Roles: "admin", "manager", "employee"
const useAuth = () => {
  const user = {
    name: "Deepak Singh",
    role: "admin", // change to "manager" or "employee" to test
  };
  return user;
};

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAuth();

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleProtectedRoute;

// ---- USAGE in App.tsx or Routes.tsx ----
/*
import RoleProtectedRoute from "./components/RoleProtectedRoute";

<Route path="/admin" element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="dashboard" element={<AdminDashboard />} />
</Route>

<Route path="/manager" element={<RoleProtectedRoute allowedRoles={["manager"]} />}>
  <Route path="team" element={<TeamManagement />} />
</Route>

<Route path="/employee" element={<RoleProtectedRoute allowedRoles={["employee"]} />}>
  <Route path="profile" element={<EmployeeProfile />} />
</Route>
*/

// ---- UNAUTHORIZED PAGE ----
// Create a basic unauthorized page
export const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600">403 - Unauthorized</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        You do not have permission to view this page.
      </p>
    </div>
  </div>
);

// ---- Hook extension (Optional: use Redux or Context for real user) ----
// Replace useAuth() with a context or Redux selector in production
