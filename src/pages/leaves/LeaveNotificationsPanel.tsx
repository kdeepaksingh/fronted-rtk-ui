import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

interface Notification {
  id: number;
  message: string;
  type: "Approved" | "Rejected" | "Pending";
  timestamp: string;
}

const notificationColors = {
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const notificationIcons = {
  Approved: <FaCheckCircle className="text-green-500" />,
  Rejected: <FaTimesCircle className="text-red-500" />,
  Pending: <FaHourglassHalf className="text-yellow-500" />,
};

const LeaveNotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        message: "Your Casual Leave has been approved.",
        type: "Approved",
        timestamp: "2025-06-25 10:00 AM",
      },
      {
        id: 2,
        message: "Your Sick Leave has been rejected.",
        type: "Rejected",
        timestamp: "2025-06-24 5:45 PM",
      },
      {
        id: 3,
        message: "Leave request submitted for Earned Leave.",
        type: "Pending",
        timestamp: "2025-06-23 09:20 AM",
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
            <FaBell /> Leave Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Stay informed about the status of your leave applications
          </p>
        </motion.div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No notifications at the moment.
            </p>
          ) : (
            notifications.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md shadow-md flex items-start gap-4 bg-white dark:bg-gray-800 border-l-4 ${
                  notificationColors[note.type]
                }`}
              >
                <div className="text-2xl">{notificationIcons[note.type]}</div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {note.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {note.timestamp}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LeaveNotificationsPanel;
