import { useState } from "react";
import { FaFilePdf, FaFileExcel, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const dummyLeaveData = [
  {
    name: "Amit Kumar",
    type: "Casual Leave",
    from: "2025-07-01",
    to: "2025-07-03",
    status: "Approved",
  },
  {
    name: "Neha Sharma",
    type: "Sick Leave",
    from: "2025-07-05",
    to: "2025-07-06",
    status: "Rejected",
  },
  {
    name: "Ravi Yadav",
    type: "Earned Leave",
    from: "2025-07-10",
    to: "2025-07-11",
    status: "Pending",
  },
];

const LeaveExportEmailTools = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleExport = (format: "pdf" | "excel") => {
    alert(`Exporting leave data as ${format.toUpperCase()}... (Mock Action)`);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            Export & Email Leave Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Generate reports and send leave data to HR
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 flex-wrap mb-8">
          <button
            onClick={() => handleExport("pdf")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaFilePdf /> Export PDF
          </button>

          <button
            onClick={() => handleExport("excel")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaFileExcel /> Export Excel
          </button>

          <button
            onClick={handleSendEmail}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaEnvelope /> Send Email
          </button>
        </div>

        {emailSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-green-600 dark:text-green-400 font-medium"
          >
            ✅ Leave report emailed successfully to HR!
          </motion.div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 mt-8 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-2">Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyLeaveData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 dark:border-gray-600"
                >
                  <td className="py-2 text-gray-800 dark:text-white">
                    {row.name}
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">
                    {row.type}
                  </td>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
                  <td className="font-semibold text-sm">
                    {row.status === "Approved" && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {row.status === "Rejected" && (
                      <span className="text-red-500">Rejected</span>
                    )}
                    {row.status === "Pending" && (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LeaveExportEmailTools;
