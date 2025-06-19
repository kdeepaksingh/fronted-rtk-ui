import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import AnimatedContactUs from "./AnimatedContactUs";

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 80,
    },
  }),
};

export default function ContactUs() {
  return (
    <section className="min-h-screen py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Contact Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have questions about our employee platform? Reach out via any method
            below and our team will respond within 24 hours.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <span>123 Corporate Drive, Tech City, India</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-red-600 text-xl" />
              <span>support@empmanage.com</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["Name", "Email", "Subject"].map((label, i) => (
            <motion.div
              key={i}
              className="flex flex-col"
              custom={i}
              variants={inputVariants}
            >
              <label htmlFor={label} className="mb-1 font-medium">
                {label}
              </label>
              <input
                type={label === "Email" ? "email" : "text"}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          ))}

          <motion.div custom={3} variants={inputVariants}>
            <label htmlFor="message" className="mb-1 font-medium block">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Enter your message"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </motion.div>

          <motion.div custom={4} variants={inputVariants}>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>
      </div>
      <AnimatedContactUs />
    </section>
  );
}
