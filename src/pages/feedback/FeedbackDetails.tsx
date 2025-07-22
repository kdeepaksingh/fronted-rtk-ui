import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegComments } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import HomeTitle from "../../components/typography/HomeTitle";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchFeedbacks } from "../../features/feedback/feedbackSlice";

const categoryTabs = [
  { key: "All", label: "All" },
  { key: "Ui_Functionality", label: "UI Functionality" },
  { key: "Suggestion_Improvements", label: "Suggestions" },
  { key: "User_Experience", label: "User Experience" },
];

const categoryColors: Record<string, string> = {
  Ui_Functionality: "bg-blue-100 text-blue-700",
  Suggestion_Improvements: "bg-green-100 text-green-700",
  User_Experience: "bg-purple-100 text-purple-700",
};

const generateAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return initials;
};

const FeedbackDetails = () => {
  const dispatch = useAppDispatch();
  const feedbackList = useAppSelector(
    (state) => state?.feedback?.feedbacks || []
  );
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const filteredFeedback =
    activeTab === "All"
      ? feedbackList
      : feedbackList.filter((fb) => fb.feedbackCategory === activeTab);

  return (
    <section className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <HomeTitle
            icon={<FaRegComments className="text-orange-600 text-4xl" />}
            text="Feedback Dashboard"
            subtitle="Insights from our users"
          />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-1.5 rounded-full text-sm font-medium shadow transition-all ${
                activeTab === tab.key
                  ? "bg-orange-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeedback.map((fb, index) => (
            <motion.div
              key={fb._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-white/10 border border-orange-200 dark:border-gray-700 shadow-xl rounded-xl p-6 backdrop-blur-md hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold text-lg rounded-full shadow-md">
                  {generateAvatar(fb.fullName)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {fb.fullName}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {moment(fb.createdAt).format("MMM Do YYYY, h:mm A")}
                  </p>
                </div>
              </div>

              {/* Category Tag */}
              <span
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-3 ${
                  categoryColors[fb.feedbackCategory] ||
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {fb.feedbackCategory.replace(/_/g, " ")}
              </span>

              {/* Comment */}
              <p className="text-sm text-gray-700 dark:text-gray-200 italic mb-3">
                “{fb.comments || fb.comment}”
              </p>

              {/* Rating (dummy example: 4 stars) */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < 4
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Contact Info */}
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-orange-500" />
                  <span>{fb.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdPhone className="text-orange-500" />
                  <span>{fb.mobileNumber}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackDetails;
