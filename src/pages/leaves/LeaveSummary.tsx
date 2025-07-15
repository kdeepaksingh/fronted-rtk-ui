import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaChartPie,
  FaCalendarCheck,
  FaTimesCircle,
  FaHourglassHalf,
  FaListUl,
  FaCalendarDay,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getLeavesSummary } from "../../features/leave/leaveSlice";

const dataColors = {
  Approved: "#10B981",
  Rejected: "#EF4444",
  Pending: "#FBBF24",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const counterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const LeaveSummaryDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const summary = useAppSelector((state) => state.leaves.summary);

  const [month, setMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const summaryData = [
    { name: "Approved", value: summary?.totalApproved || 0 },
    { name: "Rejected", value: summary?.totalRejected || 0 },
    { name: "Pending", value: summary?.totalPending || 0 },
  ];

  const leaveTypesBarData = summary?.leaveTypes
    ? Object.entries(summary.leaveTypes).map(([type, count]) => ({
        name: type.replace("Leave", " Leave"),
        value: count,
      }))
    : [];

  const cardItems = [
    {
      icon: <FaCalendarCheck />,
      label: "Approved",
      color: "#10B981",
      value: summary?.totalApproved || 0,
    },
    {
      icon: <FaTimesCircle />,
      label: "Rejected",
      color: "#EF4444",
      value: summary?.totalRejected || 0,
    },
    {
      icon: <FaHourglassHalf />,
      label: "Pending",
      color: "#FBBF24",
      value: summary?.totalPending || 0,
    },
    {
      icon: <FaListUl />,
      label: "Total Requests",
      color: "#6366F1",
      value: summary?.totalRequest || 0,
    },
  ];

  useEffect(() => {
    dispatch(getLeavesSummary());
  }, [dispatch, month, year]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 4,
        py: 8,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom right, #111827, #1f2937)"
            : "linear-gradient(to bottom right, #f5f3ff, #e0e7ff)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Title */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "#818cf8" : "#6366f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FaChartPie />
            Leave Summary Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Track leave status and category-wise breakdown.
          </Typography>
        </Box>

        {/* Filters */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          mb={4}
        >
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="month-select">Month</InputLabel>
            <Select
              labelId="month-select"
              value={month}
              label="Month"
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="year-select">Year</InputLabel>
            <Select
              labelId="year-select"
              value={year}
              label="Year"
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {[2023, 2024, 2025].map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Pie Chart + Cards */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          gap={4}
          flexWrap="wrap"
        >
          {/* Pie Chart */}
          <Paper
            elevation={3}
            sx={{
              flex: "1 1 350px",
              minWidth: 350,
              maxWidth: 450,
              p: 2,
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summaryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {summaryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={dataColors[entry.name as keyof typeof dataColors]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          {/* Cards Section */}
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="stretch"
            gap={2}
            flex="1 1 500px"
          >
            {cardItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2,
                    py: 2,
                    minWidth: 220,
                    maxWidth: 250,
                    height: "100%",
                    borderLeft: `6px solid ${item.color}`,
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 12px rgba(0,0,0,0.4)"
                        : "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 30,
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      {item.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Bar Chart Section */}
        <Paper elevation={3} sx={{ mt: 6, p: 3 }}>
          <Typography
            variant="h6"
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.text.primary,
            }}
          >
            <FaCalendarDay /> Leave Types Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leaveTypesBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={3} sx={{ mt: 1, p: 1 }}>
          {/* Leave Types Section */}
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-4">
              <FaCalendarDay /> Leave Types
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary?.leaveTypes &&
                Object.entries(summary.leaveTypes).map(([type, count]) => (
                  <div
                    key={type}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center shadow-sm"
                  >
                    <span className="capitalize text-gray-600 dark:text-gray-200">
                      {type.replace("Leave", " Leave")}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {count ?? ""}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ mt: 1, p: 1 }}>
          {/* Status Cards with Animation */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FaCalendarCheck />,
                color: "green",
                label: "Approved",
                value: summary?.totalApproved ?? 0,
              },
              {
                icon: <FaTimesCircle />,
                color: "red",
                label: "Rejected",
                value: summary?.totalRejected ?? 0,
              },
              {
                icon: <FaHourglassHalf />,
                color: "yellow",
                label: "Pending",
                value: summary?.totalPending ?? 0,
              },
              {
                icon: <FaListUl />,
                color: "indigo",
                label: "Total Requests",
                value: summary?.totalRequest ?? 0,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={`bg-${item.color}-100 dark:bg-${item.color}-900 text-${item.color}-800 dark:text-${item.color}-200 p-5 rounded-xl shadow-md flex flex-col items-center`}
                custom={i}
                variants={counterVariants}
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <p className="text-sm">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LeaveSummaryDashboard;
