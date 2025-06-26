import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserTie,
  FaHourglassHalf,
} from "react-icons/fa";

interface LeaveRequest {
  id: number;
  employeeName: string;
  leaveType: string;
  from: string;
  to: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialRequests: LeaveRequest[] = [
  {
    id: 201,
    employeeName: "Amit Kumar",
    leaveType: "Casual Leave",
    from: "2025-07-01",
    to: "2025-07-03",
    reason: "Family Function",
    status: "Pending",
  },
  {
    id: 202,
    employeeName: "Neha Sharma",
    leaveType: "Sick Leave",
    from: "2025-07-05",
    to: "2025-07-06",
    reason: "Health issue",
    status: "Pending",
  },
];

const LeaveApprovalPanel = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: action } : req
    );
    setRequests(updated);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
            <FaUserTie /> Leave Approval Panel
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Review and take action on employee leave requests
          </p>
        </motion.div>

        {requests.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            All leave requests are processed.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex justify-between items-start border-l-4 border-yellow-400"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {req.employeeName} - {req.leaveType}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {req.from} to {req.to}
                  </p>
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-400">
                    Reason: {req.reason}
                  </p>
                  <p className="text-sm mt-1 text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                    <FaHourglassHalf /> Status: {req.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1"
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeaveApprovalPanel;
