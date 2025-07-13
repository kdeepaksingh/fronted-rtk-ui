import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import RHFListInput from "../../components/dropdowns/RHFListInput";
import RHFDateInput from "../../components/inputs/RHFDateInput";
import RHFTextArea from "../../components/inputs/RHFTextArea";
import RHFFileInput from "../../components/inputs/RHFFileInput";
import MainButton from "../../components/buttons/MainButton";
import colors from "../../color";
import { toast } from "react-toastify";
import { validateNoLeadingTrailingSpaces } from "../../utils/validation";
import FileDropZone from "../../components/inputs/FileDropZone";
import { useAppDispatch } from "../../store/store";
import { createEmployee } from "../../features/employee/employeeSlice";

type FormValues = {
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
};

export default function AddEmployee() {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      department: "",
      designation: "",
      joiningDate: "",
      employeeId: "",
      address: "",
      profilePhoto: null,
      resume: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    // Prepare form data
    Object.entries(data).forEach(([key, value]) => {
      if (
        (key === "profilePhoto" || key === "resume") &&
        value instanceof FileList
      ) {
        if (value.length > 0) {
          formData.append(key, value[0]);
        }
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    try {
      const response = await dispatch(createEmployee(formData)).unwrap();

      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "Employee added successfully!"
        );
      } else {
        toast.success("Employee added successfully!");
      }

      //   reset();
    } catch (error: unknown) {
      let errorMessage = "Failed to add employee.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Box
        maxWidth={900}
        mx="auto"
        mt={2}
        p={2}
        bgcolor={colors["ui-card-light1"]}
        borderRadius={2}
        boxShadow={3}
        border="2px solid #0d4b08"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" gap={2}>
            <RHFTextInput
              name="firstName"
              label="Label.FirstName"
              placeholder="Placeholder.EnterFirstName"
              control={control}
              required
              icon={"Person"}
              rules={{
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "First name must not exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s'-]+$/,
                  message:
                    "Only letters, spaces, hyphens, and apostrophes are allowed",
                },
                validate: (value: string) => {
                  const trimmed = value.trim();
                  if (trimmed.length !== value.length) {
                    return "No leading or trailing spaces allowed";
                  }
                  return true;
                },
              }}
            />
            <RHFTextInput
              name="lastName"
              label="Label.LastName"
              placeholder="Placeholder.EnterLastName"
              control={control}
              required
              icon={"Person"}
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Last name must not exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s'-]+$/,
                  message:
                    "Only letters, spaces, hyphens, and apostrophes are allowed",
                },
                validate: (value: string) => {
                  const trimmed = value.trim();
                  if (trimmed.length !== value.length) {
                    return "No leading or trailing spaces allowed";
                  }
                  return true;
                },
              }}
            />
          </Box>
          <Box display="flex" gap={2} mt={2}>
            <RHFTextInput
              name="email"
              type="email"
              placeholder={"Placeholder.EnterEmail"}
              label={"Label.Email"}
              control={control}
              required
              icon="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address format",
                },
                validate: (value: string) => {
                  const trimmed = value.trim();

                  if (trimmed.length !== value.length) {
                    return "No leading or trailing spaces allowed";
                  }

                  if (value.toLowerCase() !== value) {
                    return "Email must be in lowercase";
                  }

                  if (value.includes("..")) {
                    return "Email cannot contain consecutive dots";
                  }

                  return true;
                },
              }}
            />

            <RHFTextInput
              name="phone"
              type="tel"
              placeholder="Placeholder.EnterMobileNumber"
              label="Label.MobileNumber"
              control={control}
              maxCharCount={10}
              required
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be exactly 10 digits",
                },
                validate: (value: string) => {
                  const trimmed = value.trim();

                  if (trimmed.length !== value.length) {
                    return "No leading or trailing spaces allowed";
                  }

                  if (!/^[6-9]/.test(value)) {
                    return "Mobile number must start with 6, 7, 8, or 9";
                  }

                  const uniqueDigits = new Set(value);
                  if (uniqueDigits.size === 1) {
                    return "Mobile number cannot have all same digits";
                  }

                  return true;
                },
              }}
              icon={"PhoneIphone"}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <RHFDateInput
              name="dob"
              control={control}
              label="Date of Birth"
              required
              rules={{
                required: "Date of Birth is required",
                validate: (value: string) => {
                  if (!value) return "Date of Birth is required";

                  //   const dob = new Date(value);
                  //   const today = new Date();
                  //   const age = today.getFullYear() - dob.getFullYear();
                  //   const isFuture = dob > today;

                  //   if (isFuture) return "Date of Birth cannot be in the future";
                  //   if (age < 18) return "Employee must be at least 18 years old";
                  //   if (age > 65) return "Age must be less than 65 years";

                  return true;
                },
              }}
            />

            <RHFListInput
              name="gender"
              label="Label.Gender"
              placeholder="Placeholder.SelectGender"
              control={control}
              required
              rules={{
                required: "Select gender",
                validate: (value: string) => {
                  const allowed = ["Male", "Female", "Other"];
                  return allowed.includes(value) || "Invalid gender selected";
                },
              }}
              data={[
                { id: "Male", value: "Male" },
                { id: "Female", value: "Female" },
                { id: "Other", value: "Other" },
              ]}
              dataID="id"
              dataValue="value"
            />
          </Box>

          {/* Row 4 */}
          <Box display="flex" gap={2} mt={2}>
            <RHFTextInput
              name="employeeId"
              label="Label.EmployeeID"
              placeholder="Placeholder.EnterEmployeeID"
              control={control}
              type="alphanumeric"
              required
              rules={{
                required: "Employee ID is required",
                minLength: {
                  value: 3,
                  message: "Employee ID must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Employee ID must not exceed 20 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/,
                  message:
                    "Only letters, numbers, hyphens (-), and underscores (_) are allowed",
                },
                validate: (value: string) => {
                  const trimmed = value.trim();

                  if (trimmed.length !== value.length) {
                    return "No leading or trailing spaces allowed";
                  }

                  if (/\s/.test(value)) {
                    return "Employee ID must not contain spaces";
                  }

                  return true;
                },
              }}
            />

            <RHFTextInput
              name="designation"
              label="Label.Designation"
              placeholder="Placeholder.EnterDesignation"
              control={control}
              required
              rules={{
                required: "Designation is required",
                minLength: {
                  value: 2,
                  message: "Designation must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Designation must not exceed 50 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s.&/-]+$/,
                  message:
                    "Designation can contain letters, numbers, spaces, dots, &, /, and hyphens",
                },
                validate: validateNoLeadingTrailingSpaces,
              }}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <RHFListInput
              name="department"
              label="Label.Department"
              control={control}
              required
              rules={{
                required: "Select department",
                validate: (value: string) => {
                  const allowedDepartments = [
                    "hr",
                    "engineering",
                    "sales",
                    "marketing",
                    "finance",
                    "operations",
                    "customer_service",
                    "it",
                    "legal",
                    "research",
                    "development",
                    "administration",
                    "product",
                    "quality_assurance",
                    "procurement",
                    "logistics",
                    "training",
                    "security",
                    "support",
                  ];
                  if (!value) return "Department selection is required";
                  if (!allowedDepartments.includes(value.toLowerCase())) {
                    return "Invalid department selected";
                  }
                  return true;
                },
              }}
              data={[
                { id: "hr", value: "HR" },
                { id: "engineering", value: "Engineering" },
                { id: "sales", value: "Sales" },
                { id: "marketing", value: "Marketing" },
                { id: "finance", value: "Finance" },
                { id: "operations", value: "Operations" },
                { id: "customer_service", value: "Customer Service" },
                { id: "it", value: "IT" },
                { id: "legal", value: "Legal" },
                { id: "research", value: "Research" },
                { id: "development", value: "Development" },
                { id: "administration", value: "Administration" },
                { id: "product", value: "Product" },
                { id: "quality_assurance", value: "Quality Assurance" },
                { id: "procurement", value: "Procurement" },
                { id: "logistics", value: "Logistics" },
                { id: "training", value: "Training" },
                { id: "security", value: "Security" },
                { id: "support", value: "Support" },
              ]}
              dataID="id"
              dataValue="value"
              placeholder="Select Department"
            />

            <RHFDateInput
              name="joiningDate"
              control={control}
              label="Label.JoiningDate"
              required
              rules={{
                required: "Joining date is required",
                validate: (value: string) => {
                  if (!value) return "Joining date is required";

                  const join = new Date(value);
                  const today = new Date();
                  const dob = getValues("dob"); // ✅ Access dob from form
                  const dobDate = dob ? new Date(dob) : null;

                  if (join > today)
                    return "Joining date cannot be in the future";
                  if (dobDate && join < dobDate)
                    return "Joining date cannot be before date of birth";

                  return true;
                },
              }}
            />
          </Box>

          <Box mt={2}>
            <RHFTextArea
              name="address"
              label="Label.Address"
              placeholder="Placeholder.EnterAddress"
              control={control}
              rules={{
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Address must not exceed 200 characters",
                },
                validate: validateNoLeadingTrailingSpaces,
              }}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <RHFFileInput
              name="profilePhoto"
              label="Label.ProfilePhoto"
              control={control}
              accept="image/*"
              multiple={false}
              rules={{
                required: "Profile photo is required",
                validate: {
                  fileType: (files: FileList | null) => {
                    if (!files || files.length === 0)
                      return "Profile photo is required";
                    const file = files[0];
                    const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "image/webp",
                    ];
                    if (!validTypes.includes(file.type)) {
                      return "Only JPG, PNG, GIF, and WEBP images are allowed";
                    }
                    return true;
                  },
                  fileSize: (files: FileList | null) => {
                    if (!files || files.length === 0) return true; // required catches this
                    const file = files[0];
                    const maxSizeMB = 2;
                    if (file.size > maxSizeMB * 1024 * 1024) {
                      return `File size must be less than ${maxSizeMB} MB`;
                    }
                    return true;
                  },
                  fileCount: (files: FileList | null) => {
                    if (!files || files.length !== 1) {
                      return "Please upload exactly one profile photo";
                    }
                    return true;
                  },
                },
              }}
            />

            <RHFFileInput
              name="resume"
              label="Label.Resume"
              control={control}
              accept=".pdf,.doc,.docx"
              multiple={false}
              rules={{
                required: "Resume file is required",
                validate: {
                  fileType: (files: FileList | null) => {
                    if (!files || files.length === 0)
                      return "Resume file is required";
                    const file = files[0];
                    const validTypes = [
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ];
                    if (!validTypes.includes(file.type)) {
                      return "Only PDF, DOC, and DOCX files are allowed";
                    }
                    return true;
                  },
                  fileSize: (files: FileList | null) => {
                    if (!files || files.length === 0) return true; // required catches empty
                    const file = files[0];
                    const maxSizeMB = 5; // 5 MB limit for resumes
                    if (file.size > maxSizeMB * 1024 * 1024) {
                      return `File size must be less than ${maxSizeMB} MB`;
                    }
                    return true;
                  },
                  fileCount: (files: FileList | null) => {
                    if (!files || files.length !== 1) {
                      return "Please upload exactly one resume file";
                    }
                    return true;
                  },
                },
              }}
            />
            <FileDropZone
              name="resume"
              control={control}
              accept=".pdf,.doc,.docx"
              required
              maxSizeMB={5}
              allowedTypes={[
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]}
            />
          </Box>

          {/* Buttons */}
          <Box textAlign="center" mt={4}>
            <MainButton
              ButtonName={`${isSubmitting ? "Submitting..." : "Add Employee"}`}
              type="submit"
              disabled={isSubmitting}
              className="inline-block bg-gradient-to-r from-[#048b90] to-[#f35f07] !px-4 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
            />
            <MainButton
              ButtonName="Reset"
              type="button"
              onClick={() => reset()}
              className="ml-4 inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-4 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
            />
          </Box>
        </form>
      </Box>
    </motion.div>
  );
}
