import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPaperPlane,
} from "react-icons/fa";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: "Deepak Singh",
      leaveType: "Sick Leave",
      from: "2025-06-20",
      to: "2025-06-22",
      reason: "Fever & Rest",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Sharma",
      leaveType: "Casual Leave",
      from: "2025-06-24",
      to: "2025-06-25",
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      leaveType: "Earned Leave",
      from: "2025-06-15",
      to: "2025-06-18",
      reason: "Travel",
      status: "Rejected",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    leaveType: "",
    from: "",
    to: "",
    reason: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      ...formData,
      status: "Pending",
    };
    setLeaves([newLeave, ...leaves]);
    setFormData({ name: "", leaveType: "", from: "", to: "", reason: "" });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    const updated = leaves.map((leave) =>
      leave.id === id ? { ...leave, status: newStatus } : leave
    );
    setLeaves(updated);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-yellow-600";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case "Rejected":
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
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
            <FaFileAlt /> Leave Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Submit, track, and manage leave requests
          </p>
        </motion.div>

        {/* Leave Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10 space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
            Apply Leave
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInput}
              required
              className="px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
            />
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInput}
              required
              className="px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleInput}
              required
              className="px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
            />
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleInput}
              required
              className="px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <textarea
            name="reason"
            placeholder="Reason for leave"
            value={formData.reason}
            onChange={handleInput}
            required
            className="w-full px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-700"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded inline-flex items-center gap-2"
          >
            <FaPaperPlane /> Submit
          </button>
        </motion.form>

        {/* Leave Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-x-auto"
        >
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
                    {leave.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {leave.leaveType}
                  </td>
                  <td className="px-4 py-3">{leave.from}</td>
                  <td className="px-4 py-3">{leave.to}</td>
                  <td className="px-4 py-3 text-sm">{leave.reason}</td>
                  <td
                    className={`px-4 py-3 flex items-center ${statusColor(
                      leave.status
                    )}`}
                  >
                    {statusIcon(leave.status)} {leave.status}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {leave.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(leave.id, "Approved")
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(leave.id, "Rejected")
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {leave.status !== "Pending" && (
                      <span className="text-gray-400 text-xs">Actioned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveManagement;

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaFileAlt,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaHourglassHalf,
// } from "react-icons/fa";

// const dummyLeaves = [
//   {
//     id: 1,
//     name: "Deepak Singh",
//     leaveType: "Sick Leave",
//     from: "2025-06-20",
//     to: "2025-06-22",
//     reason: "Fever & Rest",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     leaveType: "Casual Leave",
//     from: "2025-06-24",
//     to: "2025-06-25",
//     reason: "Personal work",
//     status: "Approved",
//   },
//   {
//     id: 3,
//     name: "Ravi Kumar",
//     leaveType: "Earned Leave",
//     from: "2025-06-15",
//     to: "2025-06-18",
//     reason: "Travel",
//     status: "Rejected",
//   },
// ];

// const LeaveManagement = () => {
//   const [leaves, setLeaves] = useState(dummyLeaves);

//   const handleStatusChange = (id: number, newStatus: string) => {
//     const updated = leaves.map((leave) =>
//       leave.id === id ? { ...leave, status: newStatus } : leave
//     );
//     setLeaves(updated);
//   };

//   const statusColor = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return "text-green-600";
//       case "Rejected":
//         return "text-red-500";
//       default:
//         return "text-yellow-600";
//     }
//   };

//   const statusIcon = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return <FaCheckCircle className="text-green-500 mr-1" />;
//       case "Rejected":
//         return <FaTimesCircle className="text-red-500 mr-1" />;
//       default:
//         return <FaHourglassHalf className="text-yellow-500 mr-1" />;
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-10"
//         >
//           <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
//             <FaFileAlt /> Leave Management
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Approve or reject leave requests submitted by employees.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-x-auto"
//         >
//           <table className="w-full table-auto text-sm">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700 text-left">
//                 <th className="px-4 py-3">Employee</th>
//                 <th className="px-4 py-3">Type</th>
//                 <th className="px-4 py-3">From</th>
//                 <th className="px-4 py-3">To</th>
//                 <th className="px-4 py-3">Reason</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaves.map((leave) => (
//                 <tr key={leave.id} className="border-b dark:border-gray-700">
//                   <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
//                     {leave.name}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                     {leave.leaveType}
//                   </td>
//                   <td className="px-4 py-3">{leave.from}</td>
//                   <td className="px-4 py-3">{leave.to}</td>
//                   <td className="px-4 py-3 text-sm">{leave.reason}</td>
//                   <td
//                     className={`px-4 py-3 flex items-center ${statusColor(
//                       leave.status
//                     )}`}
//                   >
//                     {statusIcon(leave.status)} {leave.status}
//                   </td>
//                   <td className="px-4 py-3 space-x-2">
//                     {leave.status === "Pending" && (
//                       <>
//                         <button
//                           onClick={() =>
//                             handleStatusChange(leave.id, "Approved")
//                           }
//                           className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleStatusChange(leave.id, "Rejected")
//                           }
//                           className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                     {leave.status !== "Pending" && (
//                       <span className="text-gray-400 text-xs">Actioned</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LeaveManagement;
