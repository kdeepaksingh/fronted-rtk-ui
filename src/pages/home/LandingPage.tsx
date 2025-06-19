import { FaUsers, FaClock, FaChartBar } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import MainButton from "../../components/buttons/MainButton";
import { motion } from "framer-motion";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import { useForm } from "react-hook-form";
import FooterSliderFeature from "./footer/FooterSlider";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const LandingPage = () => {
  const { control } = useForm();
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-blue-50 to-white">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-[#8e0058] to-[#9c0c05] text-white">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Simplify Your{" "}
            <span className="text-yellow-300">Employee Management</span>
          </h2>
          <p className="text-lg mb-6">
            An all-in-one platform to manage employee records, attendance, and
            reports efficiently.
          </p>
          <MainButton
            url={"/register"}
            ButtonName="Get Started Now"
            type="button"
            className="inline-block bg-gradient-to-r from-[#048b90] to-[#f35f07] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
          />
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3771/3771579.png"
            alt="HR Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white text-center">
        <h3 className="text-3xl font-bold text-orange-600 mb-12">
          Why Choose Employee Management System?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-10">
          <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Employee Directory
            </h4>
            <p className="text-gray-600">
              Manage all employee profiles in one secure, centralized place.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-lg transition">
            <FaClock className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Attendance Tracking
            </h4>
            <p className="text-gray-600">
              Track check-ins, working hours, and leave in real-time.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition">
            <FaChartBar className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Smart Reports
            </h4>
            <p className="text-gray-600">
              Generate insightful performance and payroll reports instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#040b73] to-[#9d2b00] text-white text-center">
        <h3 className="text-3xl font-bold mb-4">
          Start managing smarter, today.
        </h3>
        <p className="mb-6">
          Join hundreds of businesses using Employee Manage for HR success.
        </p>
        <MainButton
          url={"/register"}
          ButtonName="Create Free Account"
          type="button"
          className="inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
        />
      </section>
      <FooterSliderFeature />
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-14 pb-8 px-6 md:px-10 border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          {/* Company Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={0}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-orange-700 dark:text-blue-400 mb-3">
              Employee Management System
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              HR simplified. All your employee data and operations in one place.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true }}
          >
            <h4 className="!font-semibold text-xl !text-orange-800 dark:text-gray-100 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "Login"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={2}
            viewport={{ once: true }}
          >
            <h4 className="!font-semibold text-orange-800 text-xl dark:text-gray-100 mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Use", "Support", "FAQs"].map(
                (item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-blue-500 transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Newsletter + Social */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={3}
            viewport={{ once: true }}
          >
            <h4 className="!font-semibold text-orange-800 text-xl dark:text-gray-100 mb-3">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Get HR tips & platform updates.
            </p>
            <form className="items-center space-x-2">
              <div className="mt-3 mb-2">
                <RHFTextInput
                  type="email"
                  name="email"
                  placeholder={"Placeholder.EnterEmail"}
                  label={"Label.Email"}
                  control={control}
                  required
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      message: "Enter a valid email address",
                    },
                  }}
                  icon={"Email"}
                  className="w-full"
                />
              </div>
              <div className="items-center justify-center space-x-2">
                <MainButton
                  ButtonName="Action.Subscribe"
                  type="button"
                  className="inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-2 !py-1 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
                />
              </div>
            </form>

            <div className="flex space-x-4 mt-6">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
