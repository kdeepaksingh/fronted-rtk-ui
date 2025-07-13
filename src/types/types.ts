export interface AddEmployeeFormValues {
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
}
