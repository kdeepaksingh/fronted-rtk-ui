import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
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
import dayjs from "dayjs";
import {
  getStatusIcon,
  getStatusTextColor,
  statusColor,
} from "../../utils/statusHelper";
import EmptyData from "../../components/empty/EmptyData";
import HomeTitle from "../../components/typography/HomeTitle";
import MainButton from "../../components/buttons/MainButton";
import Translate from "../../components/typography/Translate";
import Icon from "../../components/icon/Icon";
import AddAttendenceForm from "./AddAttendenceForm";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchAllAttendance } from "../../features/attendence/attendanceSlice";

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

const AttendanceDetails = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const attendenceList = useAppSelector((state) => state?.attendance?.data);

  useEffect(() => {
    dispatch(fetchAllAttendance());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <HomeTitle text="Title.AttendenceRecords" />
            </div>

            <MainButton
              type="button"
              className="mt-2 md:mt-0 inline-flex items-center gap-2  text-white px-4 py-2 rounded-md transition"
              onClick={() => setIsOpenModal(true)}
            >
              <FaUserPlus />
              <Translate dataKey={"Action.AddAttendence"} />
            </MainButton>
          </div>
        </motion.div>

        {/* Attendance Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg"
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
                    Track Daily Attendance && Working Hours Status
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box p={2}>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ maxHeight: "500px", overflowY: "auto" }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#06004c" }}>
                      <TableCell sx={headerCellStyle}>Employee Name</TableCell>
                      <TableCell sx={headerCellStyle}>Employee ID</TableCell>
                      <TableCell sx={headerCellStyle}>Date</TableCell>
                      <TableCell sx={headerCellStyle}>In-Time</TableCell>
                      <TableCell sx={headerCellStyle}>Out-Time</TableCell>
                      <TableCell sx={headerCellStyle}>Status</TableCell>
                      <TableCell
                        sx={{ ...headerCellStyle, borderRight: "none" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendenceList.length > 0 ? (
                      attendenceList.map((record, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={bodyCellStyle}>
                            {record.employeeName || "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {record.employeeId || "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {dayjs(record.attendanceDate).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {record.inTime
                              ? dayjs(record.inTime).format("hh:mm A")
                              : "-"}
                          </TableCell>
                          <TableCell sx={bodyCellStyle}>
                            {record.outTime
                              ? dayjs(record.outTime).format("hh:mm A")
                              : "-"}
                          </TableCell>
                          <TableCell
                            sx={{ ...bodyCellStyle, borderRight: "none" }}
                            className={`${statusColor(
                              record.status || ""
                            )} px-4 py-3`}
                          >
                            <span className="flex items-center gap-1">
                              {record.status
                                ? getStatusIcon(record.status)
                                : null}
                              <span
                                className={`${getStatusTextColor(
                                  record.status || ""
                                )} capitalize`}
                              >
                                {record.status || "-"}
                              </span>
                            </span>
                          </TableCell>
                          {/* <TableCell
                            sx={{ ...bodyCellStyle, borderRight: "none" }}
                            className={`${statusColor(
                              record.status ?? ""
                            )} px-4 py-3`}
                          >
                            <span className="flex items-center gap-1">
                              {record.status
                                ? getStatusIcon(record.status)
                                : null}
                              <span
                                className={`${getStatusTextColor(
                                  record.status
                                )} capitalize`}
                              >
                                {record.status || "-"}
                              </span>
                            </span>
                          </TableCell> */}
                          <TableCell sx={bodyCellStyle}>
                            {record.status?.toLowerCase?.() === "late" ? (
                              <>
                                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 mr-2">
                                  Approve
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                                  Reject
                                </button>
                              </>
                            ) : (
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
          </Box>
        </motion.div>
      </div>
      {isOpenModal && (
        <AddAttendenceForm
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </section>
  );
};

export default AttendanceDetails;
