import { motion } from "framer-motion";
import { FaRegComments } from "react-icons/fa";

const feedbacks = [
  {
    id: 1,
    name: "Anjali Mehta",
    message: "The new dashboard is super helpful!",
    date: "16 June",
  },
  {
    id: 2,
    name: "Rahul Verma",
    message: "Can we have dark mode in reports section?",
    date: "14 June",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    message: "Great job on the latest release!",
    date: "12 June",
  },

  {
    id: 4,
    name: "Vikram Singh",
    message: "I love the new UI updates!",
    date: "10 June",
  },
  {
    id: 5,
    name: "Priya Sharma",
    message: "Can we improve the search functionality?",
    date: "8 June",
  },
  {
    id: 6,
    name: "Deepak Rathor",
    message: "The performance has improved significantly!",
    date: "6 June",
  },
  {
    id: 7,
    name: "Vikram Singh",
    message: "The new reporting feature is fantastic!",
    date: "4 June",
  },
  {
    id: 8,
    name: "Anjali Mehta",
    message: "I appreciate the quick response from support.",
    date: "2 June",
  },
];

const FeedbackDetails = () => (
  <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-2">
          <FaRegComments /> Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Suggestions and employee input
        </p>
      </motion.div>

      <div className="space-y-6">
        {feedbacks.map((fb) => (
          <motion.div
            key={fb.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow"
          >
            <h4 className="font-semibold text-gray-800 dark:text-white">
              {fb.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {fb.date}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {fb.message}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeedbackDetails;
