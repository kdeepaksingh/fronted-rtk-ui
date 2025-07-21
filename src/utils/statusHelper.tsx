import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
export const statusColor = (status: string) => {
  if (status === "present") return "bg-green-50 text-green-700";
  if (status === "late") return "bg-yellow-50 text-yellow-700";
  if (status === "absent") return "bg-red-50 text-red-700";
  return "bg-gray-100 text-gray-500";
};

export const getStatusTextColor = (status: string) => {
  switch (status) {
    case "present":
      return "text-green-600";
    case "absent":
      return "text-red-600";
    case "leave":
      return "text-blue-600";
    case "wfh":
      return "text-purple-600";
    case "half day":
      return "text-orange-600";
    case "late":
      return "text-yellow-600";
    default:
      return "text-gray-500";
  }
};

// export const getStatusIcon = (status: string) => {
//   if (status === "present") return <CheckCircle className="text-green-500" />;
//   if (status === "late") return <AccessTime className="text-yellow-500" />;
//   if (status === "absent") return <Cancel className="text-red-500" />;
//   return null;
// };

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <FaCheckCircle className="text-green-500" />;
    case "absent":
      return <FaTimesCircle className="text-red-500" />;
    case "leave":
      return <FaClock className="text-blue-500" />;
    case "wfh":
      return <FaClock className="text-purple-500" />;
    case "half day":
      return <FaClock className="text-orange-500" />;
    case "late":
      return <FaClock className="text-yellow-500" />;
    default:
      return null;
  }
};
