import { CheckCircle, Cancel, AccessTime } from "@mui/icons-material";
export const statusColor = (status: string) => {
  if (status === "present") return "bg-green-50 text-green-700";
  if (status === "late") return "bg-yellow-50 text-yellow-700";
  if (status === "absent") return "bg-red-50 text-red-700";
  return "bg-gray-100 text-gray-500";
};

export const getStatusIcon = (status: string) => {
  if (status === "present") return <CheckCircle className="text-green-500" />;
  if (status === "late") return <AccessTime className="text-yellow-500" />;
  if (status === "absent") return <Cancel className="text-red-500" />;
  return null;
};
