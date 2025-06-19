import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import Lottie from "lottie-react";

export default function AnimatedContactUs() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_9cyyl8i4.json") // ✅ replace with working URL
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  if (!animationData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading animation...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Lottie
            animationData={animationData}
            loop
            className="w-full max-h-[400px]"
          />
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 dark:text-white"
            variants={fadeIn}
            custom={0}
          >
            Contact Our Team
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            variants={fadeIn}
            custom={1}
          >
            Let us know how we can help you.
          </motion.p>

          <motion.form className="space-y-5" variants={fadeIn} custom={2}>
            <div>
              <label className="block mb-1 font-medium text-sm">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 text-sm focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 text-sm focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Message</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 text-sm focus:ring-blue-500"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              <FaPaperPlane /> Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
