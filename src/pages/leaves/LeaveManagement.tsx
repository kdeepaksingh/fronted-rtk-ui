import { useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchLeaves,
  updateLeaveStatus,
} from "../../features/leave/leaveSlice";
import type { Leave } from "../../types/types";
import HomeTitle from "../../components/typography/HomeTitle";

const LeaveManagement = () => {
  const dispatch = useAppDispatch();
  const leavesList = useAppSelector((state) => state.leaves.leaves);

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const handleStatusChange = async (
    _id: string | undefined,
    newStatus: "Approved" | "Rejected"
  ) => {
    if (!_id) return;
    try {
      await dispatch(
        updateLeaveStatus({ id: _id, status: newStatus })
      ).unwrap();
      dispatch(fetchLeaves());
    } catch (error) {
      console.error("Failed to update leave status:", error);
    }
  };

  const statusColor = (status?: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-yellow-600";
    }
  };

  const statusIcon = (status?: string) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500 mr-1" />;
      default:
        return <FaHourglassHalf className="text-yellow-500 mr-1" />;
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <HomeTitle
            text="Leave Management"
            subtitle="Submit, track, and manage leave requests"
            icon={<FaFileAlt className="text-orange-950" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-x-auto"
        >
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leavesList.map((leave: Leave, index: number) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
                    {leave.employeeId}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {leave.leaveType}
                  </td>
                  <td className="px-4 py-3">
                    {dayjs(leave.fromDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-3">
                    {dayjs(leave.toDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-3 text-sm">{leave.reason}</td>
                  <td
                    className={`px-4 py-3 flex items-center ${statusColor(
                      leave.status
                    )}`}
                  >
                    {statusIcon(leave.status)} {leave.status}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {leave.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(leave._id, "Approved")
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(leave._id, "Rejected")
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {leave.status?.toLowerCase() !== "pending" && (
                      <span className="text-gray-400 text-xs">Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveManagement;
