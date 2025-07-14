export interface AddEmployeeFormValues {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: string;
  designation: string;
  joiningDate: string;
  employeeId: string;
  address: string;
  profilePhoto: FileList | null;
  resume: FileList | null;
  profilePhotoUrl?: string;
  resumeUrl?: string;
}
export interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: string;
  designation: string;
  joiningDate: string;
  employeeId: string;
  address: string;
  profilePhotoUrl?: string;
  resumeUrl?: string;
}

export interface Leave {
  _id?: string;
  status?: string;
  employeeId: string;
  leaveType: "casual" | "sick" | "earned";
  dayType: "full" | "half";
  fromDate: string;
  toDate: string;
  reason: string;
  includeWeekend?: boolean;
  applyingTo: string;
  ccEmails: string[];
  attachment: FileList | null;
}
