import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaUserClock,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import { motion } from "framer-motion";

const menuItems = [
  { icon: <FaChartBar />, label: "Overview" },
  { icon: <FaUsers />, label: "Employees" },
  { icon: <FaCalendarAlt />, label: "Attendance" },
  { icon: <FaClipboardList />, label: "Tasks" },
  { icon: <FaUserClock />, label: "Leaves" },
  { icon: <FaCog />, label: "Settings" },
];

export default function DashSidebar() {
  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="bg-gradient-to-b from-orange-600 to-orange-800 !text-white w-64 p-6 sticky top-0 shadow-xl  py-10 px-6 h-screen z-20"
    >
      <h2 className="text-white text-2xl font-bold text-center mb-10 tracking-wide">
        Employee Management
      </h2>
      <ul className="space-y-6 text-lg">
        {menuItems.map((item) => (
          <motion.li
            key={item.label}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="gap-4 text-lg flex items-center p-2 rounded-lg text-white hover:bg-orange-100 hover:text-amber-900 cursor-pointer transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}
