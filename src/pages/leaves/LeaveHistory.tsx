import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";

interface LeaveRecord {
  id: number;
  leaveType: string;
  from: string;
  to: string;
  reason: string;
  status: "Approved" | "Rejected" | "Pending";
}

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState<LeaveRecord[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const mockData: LeaveRecord[] = [
      {
        id: 101,
        leaveType: "Casual Leave",
        from: "2025-06-10",
        to: "2025-06-11",
        reason: "Family work",
        status: "Approved",
      },
      {
        id: 102,
        leaveType: "Sick Leave",
        from: "2025-06-15",
        to: "2025-06-16",
        reason: "Fever",
        status: "Rejected",
      },
      {
        id: 103,
        leaveType: "Earned Leave",
        from: "2025-06-20",
        to: "2025-06-22",
        reason: "Outstation",
        status: "Pending",
      },
    ];
    setLeaveHistory(mockData);
  }, []);

  const statusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <FaCheck />;
      case "Rejected":
        return <FaTimes />;
      default:
        return <FaCalendarAlt />;
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
            <FaHistory /> My Leave History
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            View all your leave applications with status
          </p>
        </motion.div>

        <div className="grid gap-4">
          {leaveHistory.map((leave) => (
            <motion.div
              key={leave.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg p-4 shadow bg-white dark:bg-gray-800 flex justify-between items-center border-l-4 ${statusStyle(
                leave.status
              )}`}
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {leave.leaveType} ({leave.from} to {leave.to})
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reason: {leave.reason}
                </p>
              </div>
              <div className="flex items-center gap-2 text-lg font-medium">
                {statusIcon(leave.status)} {leave.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaveHistory;
