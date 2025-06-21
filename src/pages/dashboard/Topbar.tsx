import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-orange-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-500 text-xl" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
}
