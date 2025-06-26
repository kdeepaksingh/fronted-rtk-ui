import { motion } from "framer-motion";
import {
  FaUserCog,
  FaLock,
  FaBell,
  FaLanguage,
  FaPalette,
  FaCloudUploadAlt,
} from "react-icons/fa";

const settingsOptions = [
  {
    title: "Profile Settings",
    description: "Update name, email, and personal info.",
    icon: <FaUserCog />,
  },
  {
    title: "Security",
    description: "Change password and manage access.",
    icon: <FaLock />,
  },
  {
    title: "Notifications",
    description: "Manage alerts and email preferences.",
    icon: <FaBell />,
  },
  {
    title: "Language & Region",
    description: "Choose your preferred language.",
    icon: <FaLanguage />,
  },
  {
    title: "Theme",
    description: "Switch between light and dark mode.",
    icon: <FaPalette />,
  },
  {
    title: "Backup & Sync",
    description: "Cloud sync and backup settings.",
    icon: <FaCloudUploadAlt />,
  },
];

const Settings = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
            <FaUserCog />
            Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your preferences and profile
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {settingsOptions.map((opt, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all cursor-pointer hover:ring-2 hover:ring-indigo-400"
            >
              <div className="text-3xl text-indigo-600 dark:text-indigo-400 mb-3">
                {opt.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {opt.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {opt.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Settings;
