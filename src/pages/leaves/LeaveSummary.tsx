import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaCalendarCheck,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const leaveStatusNames = ["Approved", "Rejected", "Pending"] as const;
type LeaveStatus = (typeof leaveStatusNames)[number];

const dataColors: Record<LeaveStatus, string> = {
  Approved: "#10B981",
  Rejected: "#EF4444",
  Pending: "#FBBF24",
};

type SummaryData = { name: LeaveStatus; value: number };

const LeaveSummaryDashboard = () => {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([
    { name: "Approved", value: 12 },
    { name: "Rejected", value: 5 },
    { name: "Pending", value: 8 },
  ]);

  useEffect(() => {
    // Fetch leave summary from API if needed
  }, []);

  const total = summaryData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
            <FaChartPie /> Leave Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Overview of all leave statuses
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={dataColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-around mt-6 text-center">
            <div>
              <FaCalendarCheck className="text-green-500 text-xl mx-auto" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Approved
              </p>
              <p className="font-bold text-green-600">{summaryData[0].value}</p>
            </div>
            <div>
              <FaTimesCircle className="text-red-500 text-xl mx-auto" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Rejected
              </p>
              <p className="font-bold text-red-500">{summaryData[1].value}</p>
            </div>
            <div>
              <FaHourglassHalf className="text-yellow-500 text-xl mx-auto" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pending
              </p>
              <p className="font-bold text-yellow-500">
                {summaryData[2].value}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">Total Requests</p>
            <h4 className="text-2xl font-bold text-gray-700 dark:text-white">
              {total}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveSummaryDashboard;
