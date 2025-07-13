import * as yup from "yup";

export const personalDetailsSchema = yup.object({
  firstName: yup.string().required("First name is required").min(2).max(30),
  lastName: yup.string().required("Last name is required").min(2).max(30),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Invalid email")
    .test(
      "lowercase",
      "Email must be lowercase",
      (val) => val === val?.toLowerCase()
    ),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
  dob: yup
    .string()
    .required("Date of Birth is required")
    .test("valid-age", "Age must be between 18 and 65", (value) => {
      if (!value) return false;
      const birth = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - birth.getFullYear();
      return age >= 18 && age <= 65;
    }),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required").min(10).max(200),
});
