import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleDark}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="text-yellow-400"
          >
            <FaSun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            className="text-gray-800"
          >
            <FaMoon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
