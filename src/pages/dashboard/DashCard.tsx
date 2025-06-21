import { motion } from "framer-motion";
import {
  FaUserTie,
  FaCalendarAlt,
  FaClipboardList,
  FaUserClock,
} from "react-icons/fa";

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
  {
    title: "Total Employees",
    value: "148",
    icon: <FaUserTie className="text-4xl text-blue-900" />,
    color: "from-blue-300 to-blue-500",
  },
  {
    title: "Active Projects",
    value: "23",
    icon: <FaClipboardList className="text-4xl text-green-900" />,
    color: "from-green-300 to-green-500",
  },
  {
    title: "Today's Attendance",
    value: "128",
    icon: <FaCalendarAlt className="text-4xl text-purple-900" />,
    color: "from-purple-300 to-purple-500",
  },
  {
    title: "Pending Leaves",
    value: "5",
    icon: <FaUserClock className="text-4xl text-yellow-900" />,
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Pending Leaves",
    value: "5",
    icon: <FaUserClock className="text-4xl text-yellow-900" />,
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Pending Leaves",
    value: "5",
    icon: <FaUserClock className="text-4xl text-yellow-900" />,
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Pending Leaves",
    value: "5",
    icon: <FaUserClock className="text-4xl text-yellow-900" />,
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Today's Attendance",
    value: "128",
    icon: <FaCalendarAlt className="text-4xl text-purple-900" />,
    color: "from-purple-300 to-purple-500",
  },
];

const DashCard = () => {
  return (
    <div className="p-2 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          Manage your employees, projects, attendance, and leave requests all in
          one place with real-time updates and beautiful dashboards.
        </p>
      </motion.div>
    </div>
  );
};

export default DashCard;
