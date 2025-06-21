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
      transition={{ type: "spring", stiffness: 90 }}
      className="w-64 bg-white shadow-xl rounded-r-3xl py-10 px-6 sticky top-0 h-screen z-20"
    >
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-10 tracking-wide">
        EmpManage
      </h2>
      <ul className="space-y-6 text-lg">
        {menuItems.map((item) => (
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
  );
}
