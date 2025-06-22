import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaUserClock,
  FaCog,
  FaChartBar,
  FaUserTie,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import Url from "../../components/constants/Url";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: <FaUserTie />, label: "Dashboard", url: `${Url.Dashboard}` },
  { icon: <FaUserClock />, label: "Leaves", url: `${Url.Leaves}` },
  { icon: <FaUsers />, label: "Employees", url: `${Url.Employees}` },
  { icon: <FaCalendarAlt />, label: "Attendance", url: `${Url.Attendence}` },
  { icon: <FaClipboardList />, label: "Tasks", url: `${Url.Tasks}` },
  { icon: <FaChartBar />, label: "Overview", url: `${Url.Overview}` },
  { icon: <FaChartLine />, label: "Analytics", url: `${Url.Analytics}` },
  { icon: <FaCog />, label: "Settings", url: `${Url.Settings}` },
];

export default function DashSidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex">
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-gradient-to-b from-orange-600 to-orange-800 !text-white p-6 sticky top-0 shadow-xl  py-10 px-6 h-screen z-20"
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-xl cursor-pointer z-20"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? "«" : "»"}
        </button>
        <div
          className={`text-white text-2xl font-bold text-center mb-8 transition-all tracking-wide duration-300 ${
            isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          Employee Management
        </div>
        <ul className="space-y-6 text-lg">
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="gap-4 text-lg flex items-center p-3 mb-2 rounded-lg text-white hover:bg-white hover:text-amber-900 cursor-pointer transition"
              onClick={() => navigate(item?.url)}
            >
              <span className="text-xl ml-[-10px]">{item.icon}</span>
              {isSidebarOpen && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.aside>
    </div>
  );
}
