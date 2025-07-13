import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import AddEmployeeForm from "./AddEmployeeForm";
import Translate from "../../components/typography/Translate";
import MainButton from "../../components/buttons/MainButton";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import type { AddEmployeeFormValues } from "../../types/types";
import HomeTitle from "../../components/typography/HomeTitle";

const EmployeesDetails = () => {
  const dispatch = useAppDispatch();
  const employeeList =
    (useAppSelector(
      (state) => state.employees.employees
    ) as AddEmployeeFormValues[]) ?? [];

  // const { employees = [], loading } = useAppSelector(
  //   (state) => state.employees
  // );
  // const employeeList = employees as AddEmployeeFormValues[];
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const filteredEmployees = employeeList.filter((emp) => {
    const name = `${emp?.firstName ?? ""} ${emp?.lastName ?? ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <HomeTitle
              text="Header.EmployeeDirectory"
              subtitle="SubHeader.MngEmpInfo"
            />
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
        <div className="relative mb-6 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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
          {filteredEmployees.map((emp, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={emp.profilePhotoUrl}
                  alt={emp.firstName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {emp.firstName} &nbsp;
                    {emp.lastName}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {emp.designation}
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
