import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import AddEmployeeForm from "./AddEmployeeForm";
import Translate from "../../components/typography/Translate";
import MainButton from "../../components/buttons/MainButton";

const employees = [
  {
    id: 1,
    name: "Deepak Singh",
    role: "Frontend Developer",
    email: "deepak@company.com",
    avatar: "https://i.pravatar.cc/150?img=31",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "HR Manager",
    email: "priya@company.com",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    role: "Backend Developer",
    email: "ravi@company.com",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 4,
    name: "Sita Devi",
    role: "Product Manager",
    email: "sita@company.com",
    avatar: "https://i.pravatar.cc/150?img=34",
  },
  {
    id: 5,
    name: "Rahul Verma",
    role: "UI/UX Designer",
    email: "rahul@company.com",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: 6,
    name: "Anita Rao",
    role: "Data Analyst",
    email: "anita@company.com",
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: 7,
    name: "Vikram Singh",
    role: "DevOps Engineer",
    email: "vikram@company.com",
    avatar: "https://i.pravatar.cc/150?img=37",
  },
  {
    id: 8,
    name: "Anjali Patel",
    role: "Marketing Specialist",
    email: "anjali@company.com",
    avatar: "https://i.pravatar.cc/150?img=38",
  },
  {
    id: 9,
    name: "Karan Mehta",
    role: "Sales Executive",
    email: "karan@company.com",
    avatar: "https://i.pravatar.cc/150?img=39",
  },
  {
    id: 10,
    name: "Amit Yadav",
    role: "DevOps Engineer",
    email: "amit@company.com",
    avatar: "https://i.pravatar.cc/150?img=40",
  },
];

const EmployeesDetails = () => {
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Employee Directory
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage employee information and contacts.
            </p>
          </div>

          <MainButton
            type="button"
            className="mt-2 md:mt-0 inline-flex items-center gap-2  text-white px-4 py-2 rounded-md transition"
            onClick={() => setIsOpenModal(true)}
          >
            <FaUserPlus />
            <Translate dataKey={"Action.AddEmployee"} />
          </MainButton>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-400" />
        </div>

        {/* Employee Cards */}
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
          {filteredEmployees.map((emp) => (
            <motion.div
              key={emp.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {emp.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {emp.role}
                  </p>
                  <p className="text-xs text-blue-600">{emp.email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredEmployees.length === 0 && (
          <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
            No employees found.
          </p>
        )}
      </div>
      {isOpenModal && (
        <AddEmployeeForm
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </section>
  );
};

export default EmployeesDetails;
