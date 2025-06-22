import { useState, useEffect } from "react";
import {
  FaUserTie,
  FaUsers,
  FaCalendarCheck,
  FaCogs,
  FaBell,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function EmployeeHideAndShowDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.title = "Employee Dashboard";
  }, []);

  const menuItems = [
    { icon: <FaUserTie />, label: "Dashboard" },
    { icon: <FaUsers />, label: "Employees" },
    { icon: <FaCalendarCheck />, label: "Attendance" },
    { icon: <FaChartLine />, label: "Analytics" },
    { icon: <FaCogs />, label: "Settings" },
  ];

  const stats = [
    { title: "Active Employees", value: 120, total: 150, color: "bg-blue-500" },
    { title: "Projects Assigned", value: 35, total: 40, color: "bg-green-500" },
    { title: "Pending Leaves", value: 5, total: 10, color: "bg-red-500" },
  ];
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white h-screen p-4 relative overflow-hidden"
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-xl cursor-pointer z-20"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? "«" : "»"}
        </button>

        {/* Sidebar Title */}
        <div
          className={`text-2xl font-bold text-center mb-8 transition-all duration-300 ${
            isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          EmpManage
        </div>

        {/* Menu Items */}
        <ul>
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-indigo-500 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item.icon}
              {isSidebarOpen && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-indigo-700">Dashboard</h1>
          <div className="flex items-center gap-4">
            <FaBell className="text-gray-500 text-xl hover:text-indigo-600 transition" />
            <FaUserCircle className="text-gray-600 text-2xl hover:text-indigo-600 transition" />
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const progress = (stat.value / stat.total) * 100;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="p-6 rounded-xl shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${stat.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {progress.toFixed(0)}% of {stat.total}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
