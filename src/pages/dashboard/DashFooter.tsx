import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DashFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-b from-orange-600 to-orange-800 text-white py-4 px-6 mt-auto shadow-inner"
    >
      <div className="max-w-7xl mx-auto flex flex-col font-semibold sm:flex-row justify-between items-center p-2 gap-2 text-sm">
        <span className="text-center sm:text-left">
          © {new Date().getFullYear()} EmpManage. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <Link
            to="/privacy-policy"
            className="hover:underline hover:text-gray-300 transition duration-200 font-semibold"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:underline hover:text-gray-300 transition duration-200 font-semibold"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
