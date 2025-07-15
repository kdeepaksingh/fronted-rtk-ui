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
import HomeTitle from "../../components/typography/HomeTitle";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Icon from "../../components/icon/Icon";
import EmptyData from "../../components/empty/EmptyData";

const headerCellStyle = {
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "14px",
  borderRight: "2px solid #ffffff",
  textAlign: "center",
};

const bodyCellStyle = {
  fontSize: "14px",
  fontWeight: 500,
  borderRight: "1px solid #ccc",
  textAlign: "center",
};

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
      case "approved":
        return "text-green-600 font-semibold";
      case "rejected":
        return "text-red-500 font-semibold";
      default:
        return "text-yellow-600 font-semibold";
    }
  };

  const statusIcon = (status?: string) => {
    console.log("status", status);
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case "rejected":
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
            icon={<FaFileAlt className="text-orange-800 text-xl" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-x-auto"
        >
          <Box
            sx={{
              backgroundColor: "#d4f7f8",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #747474",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1.5,
                borderBottom: "3px solid #747474",
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 30,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={"statusIcon"} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#0088a2",
                    }}
                  >
                    Leave Status
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box p={2}>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#06004c" }}>
                      <TableCell sx={headerCellStyle}>Employee ID</TableCell>
                      <TableCell sx={headerCellStyle}>Leave Type</TableCell>
                      <TableCell sx={headerCellStyle}>From</TableCell>
                      <TableCell sx={headerCellStyle}>Date</TableCell>
                      <TableCell sx={headerCellStyle}>Reason</TableCell>
                      <TableCell sx={headerCellStyle}>Status</TableCell>
                      <TableCell
                        sx={{ ...headerCellStyle, borderRight: "none" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leavesList.length > 0 ? (
                      leavesList.map((data, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={bodyCellStyle}>
                            {data.employeeId || "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {data.leaveType || "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {dayjs(data.fromDate).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {dayjs(data.toDate).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {data.reason ?? "-"}
                          </TableCell>
                          <TableCell
                            sx={{ ...bodyCellStyle, borderRight: "none" }}
                            className={`px-4 py-3 flex items-center ${statusColor(
                              data.status
                            )}`}
                          >
                            {statusIcon(data.status)} {data.status || "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {data.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusChange(data._id, "Approved")
                                  }
                                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mr-2"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(data._id, "Rejected")
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 mr-2"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {data.status?.toLowerCase() !== "pending" && (
                              <span className="text-gray-400 text-xs">
                                Actioned
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <EmptyData text="No data found." />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          {/* <table className="w-full table-auto text-sm">
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
              {leavesList.map((leave, index) => (
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
          </table> */}
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveManagement;
