import { motion } from "framer-motion";
import {
  FaUsersCog,
  FaRegCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    title: "HR & Admin Tools",
    description:
      "Manage hiring, onboarding, transfers, and employee lifecycle with ease.",
    icon: FaUsersCog,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Attendance & Leave",
    description:
      "Track attendance, shifts, holidays, and leave requests in real-time.",
    icon: FaRegCalendarCheck,
    color: "from-blue-500 to-sky-400",
  },
  {
    title: "Payroll & Compliance",
    description:
      "Automate payroll, tax deductions, and ensure statutory compliance.",
    icon: FaMoneyBillWave,
    color: "from-green-500 to-teal-400",
  },
  {
    title: "Performance Tracking",
    description:
      "Set goals, track progress, and conduct 360-degree employee reviews.",
    icon: FaChartBar,
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "Project Assignments",
    description:
      "Allocate projects and monitor progress across departments with clarity.",
    icon: FaBriefcase,
    color: "from-pink-500 to-red-400",
  },
  {
    title: "Security & Access",
    description: "Role-based permissions ensure secure access across modules.",
    icon: FaShieldAlt,
    color: "from-gray-700 to-gray-500",
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
      damping: 16,
    },
  }),
};

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition">
      <div className="max-w-7xl mx-auto px-4 text-center mb-14">
        <motion.h2
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Empower your organization with intelligent, connected, and secure
          tools designed to streamline employee operations and growth.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1.5 group relative overflow-hidden"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Background blur blob */}
            <div
              className={`absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500`}
            />
            <div className="relative z-10">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-2xl mb-4`}
              >
                <service.icon />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
