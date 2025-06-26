import { motion } from "framer-motion";
import { FaFileAlt, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

type LeaveRequest = {
  id: number;
  name: string;
  type: string;
  from: string;
  to: string;
  status: "Pending" | "Approved" | "Rejected";
};

const mockLeaves: LeaveRequest[] = [
  {
    id: 1,
    name: "Deepak Singh",
    type: "Casual Leave",
    from: "2025-06-20",
    to: "2025-06-22",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Sharma",
    type: "Sick Leave",
    from: "2025-06-15",
    to: "2025-06-17",
    status: "Approved",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    type: "Earned Leave",
    from: "2025-06-10",
    to: "2025-06-14",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Sita Devi",
    type: "Maternity Leave",
    from: "2025-06-01",
    to: "2025-06-30",
    status: "Pending",
  },
  {
    id: 5,
    name: "Rahul Verma",
    type: "Paternity Leave",
    from: "2025-06-05",
    to: "2025-06-10",
    status: "Approved",
  },
  {
    id: 6,
    name: "Anita Desai",
    type: "Vacation Leave",
    from: "2025-06-20",
    to: "2025-06-25",
    status: "Rejected",
  },
  {
    id: 7,
    name: "Vikram Singh",
    type: "Compensatory Leave",
    from: "2025-06-18",
    to: "2025-06-19",
    status: "Pending",
  },
  {
    id: 8,
    name: "Anjali Patel",
    type: "Bereavement Leave",
    from: "2025-06-12",
    to: "2025-06-14",
    status: "Approved",
  },
  {
    id: 9,
    name: "Rajesh Kumar",
    type: "Unpaid Leave",
    from: "2025-06-15",
    to: "2025-06-20",
    status: "Rejected",
  },
];

const getStatusColor = (status: LeaveRequest["status"]) => {
  switch (status) {
    case "Pending":
      return "text-yellow-600";
    case "Approved":
      return "text-green-600";
    case "Rejected":
      return "text-red-600";
  }
};

const LeaveRequests = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
            <FaFileAlt /> Leave Requests
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage employee time-off and approvals.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockLeaves.map((leave) => (
            <motion.div
              key={leave.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <FaUserCircle className="text-yellow-500" />
                {leave.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                Leave Type: <strong>{leave.type}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-1">
                <FaCalendarAlt />
                From: <strong>{leave.from}</strong> to{" "}
                <strong>{leave.to}</strong>
              </p>

              <p className={`mt-3 font-medium ${getStatusColor(leave.status)}`}>
                Status: {leave.status}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveRequests;
