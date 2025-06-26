import { motion } from "framer-motion";
import { FaUserTie, FaUserFriends, FaSitemap } from "react-icons/fa";

type Team = {
  id: number;
  teamName: string;
  lead: string;
  members: number;
  department: string;
};

const mockTeams: Team[] = [
  {
    id: 1,
    teamName: "Frontend Squad",
    lead: "Deepak Singh",
    members: 6,
    department: "Engineering",
  },
  {
    id: 2,
    teamName: "HR & Talent",
    lead: "Priya Sharma",
    members: 4,
    department: "Human Resources",
  },
  {
    id: 3,
    teamName: "Backend Force",
    lead: "Ravi Kumar",
    members: 5,
    department: "Engineering",
  },
  {
    id: 4,
    teamName: "Design Team",
    lead: "Anita Desai",
    members: 5,
    department: "Design",
  },
  {
    id: 5,
    teamName: "Marketing Squad",
    lead: "Vikram Singh",
    members: 4,
    department: "Marketing",
  },
  {
    id: 6,
    teamName: "Sales Team",
    lead: "Anjali Patel",
    members: 5,
    department: "Sales",
  },
  {
    id: 7,
    teamName: "Customer Support",
    lead: "Ravi Kumar",
    members: 6,
    department: "Support",
  },
];

const TeamManagement = () => {
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
            Team Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Organize teams, roles, and reporting.
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
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockTeams.map((team) => (
            <motion.div
              key={team.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-1">
                <FaSitemap className="inline-block mr-2" />
                {team.teamName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <FaUserTie className="inline-block mr-1 text-indigo-500" />
                Lead: <span className="font-medium">{team.lead}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                <FaUserFriends className="inline-block mr-1 text-indigo-500" />
                Members: <span className="font-medium">{team.members}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Department:{" "}
                <span className="font-medium">{team.department}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamManagement;
