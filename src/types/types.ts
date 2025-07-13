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
