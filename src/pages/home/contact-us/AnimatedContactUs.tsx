import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import RHFTextInput from "../../../components/inputs/RHFTextInput";
import RHFTextArea from "../../../components/inputs/RHFTextArea";
import HelpCharacterCount from "../../../components/typography/HelpCharacterCount";
import MainButton from "../../../components/buttons/MainButton";
import Translate from "../../../components/typography/Translate";
import PageLoader from "../../../components/loader/PageLoader";

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

export default function AnimatedContactUs() {
  const { control, watch } = useForm();
  const messageChars = watch("message");
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_9cyyl8i4.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  if (!animationData) {
    return <PageLoader />;
  }

  return (
    <section className="min-h-screen py-12 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Lottie
            animationData={animationData}
            loop
            className="w-full max-w-xs"
          />
        </motion.div>

        {/* Get in Touch Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Translate
            dataKey={"Get in Touch"}
            className="text-3xl font-bold text-orange-800"
          />
          <p className="text-orange-500 dark:text-gray-400 font-semibold">
            Have questions about our employee platform? Reach out via any method
            below and our team will respond within 24 hours.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <strong>123 Corporate Drive, Tech City, India</strong>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-600 text-lg" />
              <strong>+91 98765 43210</strong>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-600 text-lg" />
              <strong>support@empmanage.com</strong>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow space-y-6"
        >
          <motion.div className="text-center" variants={inputVariants}>
            <h2 className="text-2xl font-semibold text-orange-800 dark:text-white mb-2">
              Contact Our Team
            </h2>
            <p className="text-orange-500 dark:text-gray-400 font-semibold mb-4">
              Let us know how we can help you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4"
            variants={inputVariants}
          >
            <RHFTextInput
              type="text"
              name="fullName"
              placeholder="Enter full name"
              label="Full Name"
              control={control}
              required
              rules={{
                required: "Full Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters allowed",
                },
              }}
              icon="Person"
            />
            <RHFTextInput
              type="email"
              name="email"
              placeholder="Enter email"
              label="Email"
              control={control}
              required
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email address",
                },
              }}
              icon="Email"
            />
            <RHFTextInput
              type="tel"
              name="mobileNumber"
              placeholder="Enter mobile number"
              label="Mobile Number"
              control={control}
              required
              rules={{
                required: "Mobile Number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              }}
              icon="PhoneIphone"
            />
            <RHFTextInput
              type="text"
              name="subject"
              placeholder="Enter subject"
              label="Subject"
              control={control}
              required
              rules={{
                required: "Subject is required",
              }}
              icon="Subject"
            />
            <RHFTextArea
              name="message"
              label="Message"
              placeholder="Type your message..."
              control={control}
              maxCharCount={300}
              helptooltip="Alphabets and special characters allowed"
            />
            <HelpCharacterCount value={messageChars} max={300} min={3} />
          </motion.div>

          <motion.div variants={inputVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <MainButton
                ButtonName="Send Message"
                className="!bg-orange-700 w-full font-semibold"
                type="submit"
                icon="Telegram"
              />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
