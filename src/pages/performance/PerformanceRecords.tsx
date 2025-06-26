import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaBullseye } from "react-icons/fa";

type PerformanceRecord = {
  id: number;
  name: string;
  target: string;
  achieved: string;
  status: "Excellent" | "Good" | "Needs Improvement";
};

const mockPerformance: PerformanceRecord[] = [
  {
    id: 1,
    name: "Deepak Singh",
    target: "Complete 5 UI Modules",
    achieved: "Completed all with enhancements",
    status: "Excellent",
  },
  {
    id: 2,
    name: "Priya Sharma",
    target: "Hire 10 candidates",
    achieved: "Hired 8 successfully",
    status: "Good",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    target: "Deliver backend APIs",
    achieved: "Partial delivery",
    status: "Needs Improvement",
  },
  {
    id: 4,
    name: "Sita Devi",
    target: "Improve code quality",
    achieved: "Code reviews completed",
    status: "Excellent",
  },
  {
    id: 5,
    name: "Rahul Verma",
    target: "Reduce server response time",
    achieved: "Response time improved",
    status: "Good",
  },
  {
    id: 6,
    name: "Anita Desai",
    target: "Enhance user documentation",
    achieved: "Documentation in progress",
    status: "Needs Improvement",
  },
  {
    id: 7,
    name: "Vikram Singh",
    target: "Implement CI/CD pipeline",
    achieved: "CI/CD pipeline implemented",
    status: "Excellent",
  },
  {
    id: 8,
    name: "Anjali Patel",
    target: "Conduct user testing",
    achieved: "User testing scheduled",
    status: "Good",
  },
];

const getStatusColor = (status: PerformanceRecord["status"]) => {
  switch (status) {
    case "Excellent":
      return "text-green-600";
    case "Good":
      return "text-yellow-600";
    case "Needs Improvement":
      return "text-red-600";
  }
};

const getStatusIcon = (status: PerformanceRecord["status"]) => {
  switch (status) {
    case "Excellent":
      return <FaArrowUp />;
    case "Good":
      return <FaBullseye />;
    case "Needs Improvement":
      return <FaArrowDown />;
  }
};

const PerformanceRecords = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Employee Performance
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Review employee goals and evaluations.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockPerformance.map((record) => (
            <motion.div
              key={record.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {record.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                🎯 Target: <span className="font-medium">{record.target}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                ✅ Achieved:{" "}
                <span className="font-medium">{record.achieved}</span>
              </p>
              <div
                className={`mt-4 flex items-center gap-2 font-medium text-sm ${getStatusColor(
                  record.status
                )}`}
              >
                {getStatusIcon(record.status)} {record.status}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceRecords;
