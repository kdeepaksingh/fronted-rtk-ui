import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

type EmployeeIDCard = {
  id: number;
  name: string;
  position: string;
  employeeCode: string;
  department: string;
  photo: string;
};

const mockIDCards: EmployeeIDCard[] = [
  {
    id: 1,
    name: "Deepak Singh",
    position: "Frontend Developer",
    employeeCode: "A005818",
    department: "Engineering",
    photo: "https://i.pravatar.cc/100?img=31",
  },
  {
    id: 2,
    name: "Deepak Rathor",
    position: "Frontend Developer",
    employeeCode: "EMP1001",
    department: "Engineering",
    photo: "https://i.pravatar.cc/100?img=34",
  },
  {
    id: 3,
    name: "Priya Sharma",
    position: "HR Manager",
    employeeCode: "EMP1002",
    department: "HR",
    photo: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    position: "Backend Developer",
    employeeCode: "EMP1003",
    department: "Engineering",
    photo: "https://i.pravatar.cc/100?img=33",
  },
  {
    id: 5,
    name: "Sita Devi",
    position: "Product Manager",
    employeeCode: "EMP1004",
    department: "Product",
    photo: "https://i.pravatar.cc/100?img=35",
  },
  {
    id: 6,
    name: "Rahul Verma",
    position: "UI/UX Designer",
    employeeCode: "EMP1005",
    department: "Design",
    photo: "https://i.pravatar.cc/100?img=36",
  },
  {
    id: 7,
    name: "Anjali Singh",
    position: "Marketing Manager",
    employeeCode: "EMP1006",
    department: "Marketing",
    photo: "https://i.pravatar.cc/100?img=37",
  },
  {
    id: 8,
    name: "Vikram Patel",
    position: "Data Analyst",
    employeeCode: "EMP1007",
    department: "Analytics",
    photo: "https://i.pravatar.cc/100?img=38",
  },
  {
    id: 9,
    name: "Sneha Gupta",
    position: "Business Analyst",
    employeeCode: "EMP1008",
    department: "Business",
    photo: "https://i.pravatar.cc/100?img=39",
  },
  {
    id: 10,
    name: "Amit Yadav",
    position: "DevOps Engineer",
    employeeCode: "EMP1009",
    department: "DevOps",
    photo: "https://i.pravatar.cc/100?img=40",
  },
];

const IDCards = () => {
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
            Employee ID Cards
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate digital employee ID cards.
          </p>
        </motion.div>

        {/* ID Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockIDCards.map((emp) => (
            <motion.div
              key={emp.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg text-center"
            >
              <div className="flex flex-col items-center">
                <img
                  src={emp.photo}
                  alt={emp.name}
                  className="w-24 h-24 rounded-full border-4 border-cyan-500 mb-3 object-cover"
                />
                <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                  {emp.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {emp.position}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: <strong>{emp.employeeCode}</strong>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dept: <strong>{emp.department}</strong>
                </p>

                <button className="mt-4 inline-flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-all">
                  <FaDownload /> Download ID
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IDCards;
