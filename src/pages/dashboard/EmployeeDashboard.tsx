import { useEffect } from "react";
import {
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaClipboardList,
  FaUserClock,
  FaBell,
  FaCog,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function EmployeeDashboard() {
  useEffect(() => {
    document.title = "Employee Dashboard";
  }, []);

  const menuItems = [
    { icon: <FaChartBar />, label: "Overview" },
    { icon: <FaUsers />, label: "Employees" },
    { icon: <FaCalendarAlt />, label: "Attendance" },
    { icon: <FaClipboardList />, label: "Tasks" },
    { icon: <FaUserClock />, label: "Leaves" },
    { icon: <FaCog />, label: "Settings" },
  ];

  const cards = [
    {
      title: "Total Employees",
      value: "148",
      icon: <FaUserTie className="text-4xl text-blue-600" />,
      color: "from-blue-100 to-blue-300",
    },
    {
      title: "Active Projects",
      value: "23",
      icon: <FaClipboardList className="text-4xl text-green-600" />,
      color: "from-green-100 to-green-300",
    },
    {
      title: "Today's Attendance",
      value: "128",
      icon: <FaCalendarAlt className="text-4xl text-purple-600" />,
      color: "from-purple-100 to-purple-300",
    },
    {
      title: "Pending Leaves",
      value: "5",
      icon: <FaUserClock className="text-4xl text-yellow-600" />,
      color: "from-yellow-100 to-yellow-300",
    },
  ];

  return (
    <div className="flex font-sans bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 90 }}
        className="w-64 bg-white shadow-xl rounded-r-3xl py-10 px-6 sticky top-0 h-screen z-20"
      >
        <h2 className="text-3xl font-bold text-orange-700 text-center mb-10 tracking-wide">
          EmpManage
        </h2>
        <ul className="space-y-6 text-lg">
          {menuItems.map((item, idx) => (
            <motion.li
              key={item.label}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-4 p-2 rounded-lg text-gray-700 hover:bg-orange-100 cursor-pointer transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md mb-6 sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-orange-700">Dashboard</h1>
          <div className="flex items-center gap-6">
            <FaBell className="text-gray-500 text-xl cursor-pointer" />
            <FaUserCircle className="text-gray-600 text-2xl" />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`p-6 bg-gradient-to-br ${card.color} rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-800 text-lg font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold mt-2 text-gray-700">
                    {card.value}
                  </p>
                </div>
                <div className="opacity-80">{card.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-8 rounded-3xl bg-white shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-4">
            Welcome to the Employee Management Portal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your employees, projects, attendance, and leave requests all
            in one place with real-time updates and beautiful dashboards.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
