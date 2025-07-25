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
import { useAppDispatch } from "../../../store/store";
import { toast } from "react-toastify";
import { submitContactForm } from "../../../features/contact/contactUsSlice";

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

export default function ContactUs() {
  const dispatch = useAppDispatch();
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      subject: "",
      message: "",
    },
  });
  const messageChars = watch("message");
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_9cyyl8i4.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await dispatch(submitContactForm(data)).unwrap();

      toast.success(
        (response as { message?: string })?.message ||
          "Contact submitted successfully!"
      );

      reset();
    } catch (error: unknown) {
      let errorMessage = "Failed to submit contact.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  if (!animationData) {
    return <PageLoader />;
  }

  return (
    <section className="min-h-screen py-10 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Get in Touch + Lottie */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Translate
            dataKey={"Get in Touch"}
            className="font-semibold text-3xl text-orange-800"
          />
          <p className="text-orange-400 dark:text-gray-400 font-semibold">
            Have questions about our employee platform? Reach out via any method
            below and our team will respond within 24 hours.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <strong>123 Corporate Drive, Tech City, India</strong>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <strong>+91 98765 43210</strong>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-red-600 text-xl" />
              <strong>support@empmanage.com</strong>
            </div>
          </div>

          <Lottie
            animationData={animationData}
            loop
            className="w-full h-[300px] mt-6"
          />
        </motion.div>

        {/* Right Side: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-200 border-orange-800 border-[2px] dark:bg-gray-800 p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <motion.div
            className="col-span-2 text-center"
            variants={inputVariants}
          >
            <motion.h2
              className="text-3xl font-semibold mb-2 text-orange-800 dark:text-white"
              variants={fadeIn}
              custom={0}
            >
              Contact Our Team
            </motion.h2>
            <motion.p
              className="text-orange-500 dark:text-gray-400 mb-4 font-semibold"
              variants={fadeIn}
              custom={1}
            >
              Let us know how we can help you.
            </motion.p>
          </motion.div>

          <motion.div variants={inputVariants}>
            <RHFTextInput
              type="text"
              name="fullName"
              placeholder="Placeholder.EnterFullName"
              label="Label.FullName"
              control={control}
              maxCharCount={20}
              required
              rules={{
                required: "Full Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters are allowed in full name",
                },
              }}
              icon="Person"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <RHFTextInput
              type="email"
              name="email"
              placeholder="Placeholder.EnterEmail"
              label="Label.Email"
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
          </motion.div>

          <motion.div variants={inputVariants}>
            <RHFTextInput
              type="tel"
              name="mobileNumber"
              placeholder="Placeholder.EnterMobileNumber"
              label="Label.MobileNumber"
              control={control}
              maxCharCount={10}
              required
              rules={{
                required: "Mobile Number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
                },
              }}
              icon="PhoneIphone"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <RHFTextInput
              type="text"
              name="subject"
              placeholder="Placeholder.EnterSubject"
              label="Label.Subject"
              control={control}
              maxCharCount={20}
              required
              rules={{
                required: "Subject is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters are allowed in subject",
                },
              }}
              icon="Subject"
            />
          </motion.div>

          <motion.div className="col-span-2" variants={inputVariants}>
            <RHFTextArea
              name="message"
              label={"Label.Message"}
              placeholder={"Placeholder.EnterMessage"}
              control={control}
              maxCharCount={300}
              helptooltip="Alphabets,Special Character Allowed"
            />
            <HelpCharacterCount max={300} min={3} value={messageChars} />
          </motion.div>
          <MainButton
            ButtonName="Action.SendMessage"
            className="!bg-orange-700 w-full h-8 font-semibold"
            type="submit"
            icon="Telegram"
          />
        </form>
      </div>
    </section>
  );
}
