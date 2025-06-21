import { FaBell, FaUserCircle } from "react-icons/fa";

const DashTopbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md mb-6 sticky top-0 z-10">
      <h1 className="text-2xl font-semibold text-orange-700">Dashboard</h1>
      <div className="flex items-center gap-6">
        <FaBell className="text-gray-500 text-xl cursor-pointer" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default DashTopbar;
