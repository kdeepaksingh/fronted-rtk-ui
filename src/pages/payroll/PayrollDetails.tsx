import { motion } from "framer-motion";
import {
  FaDownload,
  FaMoneyBillWave,
  FaMinusCircle,
  FaWallet,
} from "react-icons/fa";

type PayrollRecord = {
  id: number;
  name: string;
  month: string;
  grossSalary: string;
  deductions: string;
  netPay: string;
};

const mockPayrolls: PayrollRecord[] = [
  {
    id: 1,
    name: "Deepak Singh",
    month: "June 2025",
    grossSalary: "₹80,000",
    deductions: "₹5,000",
    netPay: "₹75,000",
  },
  {
    id: 2,
    name: "Priya Sharma",
    month: "June 2025",
    grossSalary: "₹70,000",
    deductions: "₹3,000",
    netPay: "₹67,000",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    month: "June 2025",
    grossSalary: "₹90,000",
    deductions: "₹7,000",
    netPay: "₹83,000",
  },
  {
    id: 4,
    name: "Sita Devi",
    month: "June 2025",
    grossSalary: "₹85,000",
    deductions: "₹4,000",
    netPay: "₹81,000",
  },
  {
    id: 5,
    name: "Rahul Verma",
    month: "June 2025",
    grossSalary: "₹75,000",
    deductions: "₹2,500",
    netPay: "₹72,500",
  },
  {
    id: 6,
    name: "Anita Desai",
    month: "June 2025",
    grossSalary: "₹65,000",
    deductions: "₹1,500",
    netPay: "₹63,500",
  },
  {
    id: 7,
    name: "Vikram Singh",
    month: "June 2025",
    grossSalary: "₹95,000",
    deductions: "₹8,000",
    netPay: "₹87,000",
  },
  {
    id: 8,
    name: "Anjali Patel",
    month: "June 2025",
    grossSalary: "₹78,000",
    deductions: "₹3,500",
    netPay: "₹74,500",
  },
];

const PayrollDetails = () => {
  return (
    <section className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Payroll Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Salary slips and payroll management
          </p>
        </motion.div>

        {/* Payroll Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockPayrolls.map((record) => (
            <motion.div
              key={record.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {record.name}
                </h3>
                <button className="text-sm flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                  <FaDownload /> Slip
                </button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                Month: <span className="font-medium">{record.month}</span>
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <FaMoneyBillWave /> Gross Salary:{" "}
                  <strong>{record.grossSalary}</strong>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <FaMinusCircle /> Deductions:{" "}
                  <strong>{record.deductions}</strong>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <FaWallet /> Net Pay: <strong>{record.netPay}</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PayrollDetails;
