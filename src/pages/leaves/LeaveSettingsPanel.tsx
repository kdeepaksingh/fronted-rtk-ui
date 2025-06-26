import { useState } from "react";
import { motion } from "framer-motion";
import { FaCogs, FaTrash, FaPlusCircle } from "react-icons/fa";

interface LeaveType {
  id: number;
  name: string;
  limit: number;
}

const LeaveSettingsPanel = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: 1, name: "Casual Leave", limit: 12 },
    { id: 2, name: "Sick Leave", limit: 8 },
  ]);

  const [newLeave, setNewLeave] = useState({ name: "", limit: 0 });

  const handleAddLeave = () => {
    if (!newLeave.name || newLeave.limit <= 0) return;
    const id = Date.now();
    setLeaveTypes([...leaveTypes, { id, ...newLeave }]);
    setNewLeave({ name: "", limit: 0 });
  };

  const handleDelete = (id: number) => {
    setLeaveTypes(leaveTypes.filter((lt) => lt.id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2">
            <FaCogs /> Leave Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage leave types and their annual limits
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Leave Type Name"
              value={newLeave.name}
              onChange={(e) =>
                setNewLeave({ ...newLeave, name: e.target.value })
              }
              className="p-2 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Annual Limit"
              value={newLeave.limit || ""}
              onChange={(e) =>
                setNewLeave({ ...newLeave, limit: parseInt(e.target.value) })
              }
              className="p-2 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={handleAddLeave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlusCircle /> Add Leave Type
          </button>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Leave Types List
            </h3>
            <ul className="space-y-2">
              {leaveTypes.map((type) => (
                <li
                  key={type.id}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded"
                >
                  <span>
                    {type.name} - {type.limit} days/year
                  </span>
                  <button
                    onClick={() => handleDelete(type.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveSettingsPanel;
