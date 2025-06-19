import { motion } from "framer-motion";
import {
  FaUserTie,
  FaClock,
  FaMoneyCheckAlt,
  FaKey,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    title: "Employee Directory",
    desc: "Search and manage employees from a centralized dashboard.",
    icon: FaUserTie,
    color: "from-blue-400 to-blue-500",
  },
  {
    title: "Attendance Tracking",
    desc: "Automate clock-ins, leaves, and shift management.",
    icon: FaClock,
    color: "from-indigo-400 to-indigo-500",
  },
  {
    title: "Payroll Integration",
    desc: "Seamless payroll computations with real-time insights.",
    icon: FaMoneyCheckAlt,
    color: "from-green-400 to-green-500",
  },
  {
    title: "Role-Based Access",
    desc: "Secure your data using department/seniority-level access.",
    icon: FaKey,
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "Performance Reviews",
    desc: "Track goals, feedback, and progress over time.",
    icon: FaChartLine,
    color: "from-purple-400 to-purple-500",
  },
  {
    title: "Real-time Alerts",
    desc: "Instant notifications for approvals and key events.",
    icon: FaBell,
    color: "from-red-400 to-red-500",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const iconVariant = {
  hidden: { scale: 0 },
  show: {
    scale: [0, 1.2, 0.9, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
};

const FeaturesAnimated = () => (
  <section className="py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <div className="text-center mb-14 px-4">
      <h2 className="text-4xl font-bold mb-2">Key Features</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        Explore the powerful capabilities that make EmpManage the go-to HR
        platform.
      </p>
    </div>

    <motion.div
      className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 relative"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Gradient background circles */}
      <div className="absolute top-0 left-1/2 w-96 h-96 transform -translate-x-1/2 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl" />
      {features.map((f, i) => (
        <motion.div
          key={i}
          variants={cardVariant}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
          className={`relative bg-gray-50 dark:bg-gray-800 p-6 rounded-xl overflow-hidden z-10 transition cursor-pointer`}
        >
          <motion.div variants={iconVariant} className="text-4xl mb-4">
            <div
              className={`inline-block bg-gradient-to-r ${f.color} text-white p-4 rounded-full`}
            >
              <f.icon />
            </div>
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default FeaturesAnimated;
