import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const LeaveSummaryDashboard = () => {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(getLeavesSummary()); // Optionally pass filters here
  }, [dispatch, month, year]);

  const counterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
            <FaChartPie />
            Leave Summary Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Overview of leave status and leave types
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white shadow"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white shadow"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Chart + Counters */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
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
          </div>

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
        </div>

        {/* Bar Chart */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-4">
            <FaCalendarDay /> Leave Types Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leaveTypesBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
          {/* Leave Types Section */}
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
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
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeaveSummaryDashboard;
