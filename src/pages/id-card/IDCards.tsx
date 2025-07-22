import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { AddEmployeeFormValues } from "../../types/types";
import { useEffect } from "react";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import HomeTitle from "../../components/typography/HomeTitle";

const IDCards = () => {
  const dispatch = useAppDispatch();
  const employeeList =
    (useAppSelector(
      (state) => state.employees.employees
    ) as AddEmployeeFormValues[]) ?? [];

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <HomeTitle
            text="Header.EmployeeIDCards"
            subtitle="SubHeader.GenerateEmpIDCards"
          />
        </motion.div>

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
          {employeeList.map((emp, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg text-center"
            >
              <div className="flex flex-col items-center">
                <img
                  src={emp.profilePhotoUrl}
                  alt={emp.firstName}
                  className="w-24 h-24 rounded-full border-4 border-cyan-500 mb-3 object-cover"
                />
                <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {emp.designation}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: <strong>{emp.employeeId}</strong>
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
