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
  cancelLeave,
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const handleCancelLeave = async (id?: string) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this leave?"
    );
    if (!confirmed) return;

    try {
      const response = await dispatch(cancelLeave(id)).unwrap();

      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "Leave cancelled successfully!"
        );
      } else {
        toast.success("Leave cancelled successfully!");
      }

      navigate("/dashboard/leave-summary");
    } catch (error: unknown) {
      let errorMessage = "Failed to cancel leave.";
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
                            className={`px-4 py-3 ${statusColor(data.status)}`}
                          >
                            <span className="flex items-center gap-1">
                              {statusIcon(data.status)}
                              <span className="capitalize">
                                {data.status || "-"}
                              </span>
                            </span>
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
                                <button
                                  onClick={() => handleCancelLeave(data._id)}
                                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                >
                                  Cancel
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
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveManagement;
