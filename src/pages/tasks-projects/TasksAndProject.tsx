import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";

const tasks = [
  { id: 1, title: "Design Dashboard", status: "In Progress", due: "25 June" },
  { id: 2, title: "Recruit 3 Developers", status: "Completed", due: "15 June" },
  { id: 3, title: "Setup Deployment", status: "Pending", due: "30 June" },
  {
    id: 4,
    title: "Conduct User Research",
    status: "In Progress",
    due: "20 June",
  },
  {
    id: 5,
    title: "Implement Feedback System",
    status: "Pending",
    due: "25 June",
  },
  { id: 6, title: "Update Documentation", status: "Completed", due: "10 June" },
  {
    id: 7,
    title: "Prepare Release Notes",
    status: "In Progress",
    due: "28 June",
  },
  { id: 8, title: "Organize Team Meeting", status: "Pending", due: "22 June" },
  { id: 9, title: "Review Codebase", status: "Completed", due: "18 June" },
  { id: 10, title: "Plan Next Sprint", status: "In Progress", due: "27 June" },
];

const getStatusColor = (status: string) => {
  if (status === "Completed") return "text-green-600";
  if (status === "In Progress") return "text-yellow-600";
  return "text-red-600";
};

const TasksAndProject = () => (
  <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-lime-600 dark:text-lime-400 flex items-center justify-center gap-2">
          <FaClipboardList /> Tasks & Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Assign and monitor progress
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Due: {task.due}
            </p>
            <p className={`mt-2 font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TasksAndProject;
