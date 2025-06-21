import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Topbar />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Employees" value="134" color="bg-blue-500" />
          <Card title="Active Projects" value="12" color="bg-green-500" />
          <Card title="Pending Leaves" value="4" color="bg-yellow-500" />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
