import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "Holiday Notice",
    date: "18 June 2025",
    message: "Office will remain closed on Friday due to a public holiday.",
  },
  {
    id: 2,
    title: "Policy Update",
    date: "15 June 2025",
    message: "Updated remote work policy is now live. Check your email.",
  },
  {
    id: 3,
    title: "System Maintenance",
    date: "12 June 2025",
    message: "Scheduled system maintenance on Saturday from 2 AM to 4 AM.",
  },
  {
    id: 4,
    title: "New Feature Launch",
    date: "10 June 2025",
    message:
      "Introducing the new project management tool. Join the webinar on Monday.",
  },
  {
    id: 5,
    title: "Team Outing",
    date: "8 June 2025",
    message: "Join us for a team outing next Friday. RSVP by Wednesday.",
  },
  {
    id: 6,
    title: "Quarterly Review",
    date: "5 June 2025",
    message: "Prepare your presentations for the quarterly review meeting.",
  },
  {
    id: 7,
    title: "Employee Feedback",
    date: "3 June 2025",
    message: "We value your feedback! Please fill out the survey.",
  },
  {
    id: 8,
    title: "Training Session",
    date: "1 June 2025",
    message: "Join us for a training session on the new software tools.",
  },
  {
    id: 9,
    title: "Health and Safety",
    date: "30 May 2025",
    message: "Reminder to follow health and safety protocols in the office.",
  },
  {
    id: 10,
    title: "New Joiners",
    date: "28 May 2025",
    message: "Welcome our new team members who joined this month!",
  },
];

const NotificationDetails = () => (
  <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
          <FaBell /> Notifications
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Company-wide alerts and updates
        </p>
      </motion.div>

      <div className="space-y-6">
        {notifications.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {note.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {note.date}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {note.message}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default NotificationDetails;
