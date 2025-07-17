import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { statusColor } from "../../utils/statusHelper";
import EmptyData from "../../components/empty/EmptyData";

type AttendanceRecord = {
  id: number;
  name: string;
  date: string;
  inTime: string;
  outTime: string;
  status: "Present" | "Absent" | "Late";
};

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

const mockData: AttendanceRecord[] = [
  {
    id: 1,
    name: "Deepak Singh",
    date: "2025-06-19",
    inTime: "09:05 AM",
    outTime: "06:00 PM",
    status: "Present",
  },
  {
    id: 2,
    name: "Priya Sharma",
    date: "2025-06-19",
    inTime: "-",
    outTime: "-",
    status: "Absent",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    date: "2025-06-19",
    inTime: "10:15 AM",
    outTime: "06:10 PM",
    status: "Late",
  },
];

const AttendanceDetails = () => {
  const [records] = useState<AttendanceRecord[]>(mockData);

  const getStatusIcon = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "Present":
        return <FaCheckCircle className="text-green-500" />;
      case "Absent":
        return <FaTimesCircle className="text-red-500" />;
      case "Late":
        return <FaClock className="text-yellow-500" />;
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Attendance Records
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track daily attendance and working hours
          </p>
        </motion.div>

        {/* Attendance Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg"
        >
          <Box p={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#06004c" }}>
                    <TableCell sx={headerCellStyle}>Employee Name</TableCell>
                    <TableCell sx={headerCellStyle}>Employee ID</TableCell>
                    <TableCell sx={headerCellStyle}>Date</TableCell>
                    <TableCell sx={headerCellStyle}>In-Time</TableCell>
                    <TableCell sx={headerCellStyle}>Out-Time</TableCell>
                    <TableCell sx={headerCellStyle}>Status</TableCell>
                    <TableCell sx={{ ...headerCellStyle, borderRight: "none" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.length > 0 ? (
                    records.map((record, idx) => (
                      <TableRow key={idx}>
                        <TableCell sx={bodyCellStyle}>
                          {record.name || "-"}
                        </TableCell>
                        <TableCell sx={bodyCellStyle}>
                          {dayjs(record.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell sx={bodyCellStyle}>
                          {record.inTime || "-"}
                        </TableCell>
                        <TableCell sx={bodyCellStyle}>
                          {record.outTime || "-"}
                        </TableCell>
                        <TableCell
                          sx={{ ...bodyCellStyle, borderRight: "none" }}
                          className={`${statusColor(record.status)} px-4 py-3`}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(record.status)}
                            <span
                              className={`${
                                record.status === "Present"
                                  ? "text-green-600"
                                  : record.status === "Late"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              } capitalize`}
                            >
                              {record.status || "-"}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell sx={bodyCellStyle}>
                          {record.status?.toLowerCase() === "pending" && (
                            <>
                              <button
                                // onClick={() =>
                                //   handleStatusChange(record._id, "Approved")
                                // }
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mr-2"
                              >
                                Approve
                              </button>
                              <button
                                // onClick={() =>
                                //   handleStatusChange(record._id, "Rejected")
                                // }
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {record.status?.toLowerCase() !== "pending" && (
                            <span className="text-gray-400 text-xs">
                              Actioned
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <EmptyData text="No attendance records found." />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">In-Time</th>
                <th className="px-6 py-4 font-semibold">Out-Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <motion.tr
                  key={record.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="border-t dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {record.inTime}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {record.outTime}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2 text-sm font-medium">
                    {getStatusIcon(record.status)}
                    <span
                      className={`${
                        record.status === "Present"
                          ? "text-green-600"
                          : record.status === "Late"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table> */}
        </motion.div>
      </div>
    </section>
  );
};

export default AttendanceDetails;
