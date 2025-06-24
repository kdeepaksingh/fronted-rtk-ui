import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashSidebar from "./DashSidebar";
import DashTopbar from "./DashTopbar";
import { CheckConnection } from "../../components/checkconnection/CheckConnection";

export default function Dashboard() {
  return (
    <div className="flex">
      <DashSidebar />
      <div className="w-full min-h-screen bg-gray-100">
        <DashTopbar />
        <CheckConnection>
          <Outlet />
        </CheckConnection>
        {/* <Outlet /> */}
        <DashFooter />
      </div>
    </div>
  );
}
