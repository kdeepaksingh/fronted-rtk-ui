import { motion } from "framer-motion";
import {
  FaUserTie,
  FaClock,
  FaMoneyCheckAlt,
  FaKey,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import FeaturesAnimated from "./FeaturesAnimated";

const features = [
  {
    title: "Employee Directory",
    desc: "Manage employee records in a central, searchable hub.",
    icon: FaUserTie,
  },
  {
    title: "Attendance Tracking",
    desc: "Monitor in/out times, shifts, and leaves automatically.",
    icon: FaClock,
  },
  {
    title: "Payroll Automation",
    desc: "Automate payroll calculations and payslip generation.",
    icon: FaMoneyCheckAlt,
  },
  {
    title: "Role-Based Access",
    desc: "Control feature access based on roles and permissions.",
    icon: FaKey,
  },
  {
    title: "Performance Review",
    desc: "Enable feedback loops and review employee performance.",
    icon: FaChartLine,
  },
  {
    title: "Instant Alerts",
    desc: "Get notified about HR updates and approvals in real-time.",
    icon: FaBell,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Our Key Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Smooth, smart, and scalable — designed for modern workforce
          management.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 text-3xl">
              <feature.icon />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
      <FeaturesAnimated />
    </section>
  );
}
