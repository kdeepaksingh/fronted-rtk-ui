import { FaUserTie, FaUsers, FaCalendarCheck, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";

const menuItems = [
  { icon: <FaUserTie />, label: "Dashboard" },
  { icon: <FaUsers />, label: "Employees" },
  { icon: <FaCalendarCheck />, label: "Attendance" },
  { icon: <FaCogs />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-b from-orange-600 to-orange-800 text-white w-64 h-screen p-6 fixed left-0 top-0 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-10 text-center">EmpManage</h2>
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 text-lg cursor-pointer hover:text-yellow-200"
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
