import { Box } from "@mui/material";
import Modal from "../../components/modal/Modal";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import RHFListInput from "../../components/dropdowns/RHFListInput";
import RHFDateInput from "../../components/inputs/RHFDateInput";
import RHFTextArea from "../../components/inputs/RHFTextArea";
import HelpCharacterCount from "../../components/typography/HelpCharacterCount";
import RHFFileInput from "../../components/inputs/RHFFileInput";
import MainButton from "../../components/buttons/MainButton";
import { useForm } from "react-hook-form";
import colors from "../../color";
import { validateNoLeadingTrailingSpaces } from "../../utils/validation";
import RHFTimePicker from "../../components/inputs/RHFTimePicker";
import {
  fetchAllAttendance,
  markAttendance,
} from "../../features/attendence/attendanceSlice";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";

interface AddAttendenceProps {
  open: boolean;
  onClose: () => void;
}

interface AttendanceFormValues {
  employeeName: string;
  employeeId: string;
  attendanceDate: Date | null;
  attendanceType: string;
  department: string;
  designation: string;
  gender: string;
  inTime: string | null;
  outTime: string | null;
  reason: string;
  status: string;
  attachment: FileList | null;
}

const AddAttendenceForm = ({ open, onClose }: AddAttendenceProps) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, reset, watch, control } = useForm({
    defaultValues: {
      employeeName: "",
      employeeId: "",
      attendanceDate: null,
      attendanceType: "",
      department: "",
      designation: "",
      gender: "",
      inTime: null,
      outTime: null,
      reason: "",
      status: "",
      attachment: null,
    },
  });

  const reasonChars = watch("reason");

  const onSubmit = async (data: AttendanceFormValues) => {
    const formData = new FormData();

    formData.append("employeeName", data.employeeName);
    formData.append("employeeId", data.employeeId);
    formData.append("attendanceType", data.attendanceType);
    formData.append("department", data.department);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("reason", data.reason);
    formData.append("status", data.status);

    formData.append(
      "attendanceDate",
      data.attendanceDate ? new Date(data.attendanceDate).toISOString() : ""
    );
    formData.append(
      "inTime",
      data.inTime ? new Date(data.inTime).toISOString() : ""
    );
    formData.append(
      "outTime",
      data.outTime ? new Date(data.outTime).toISOString() : ""
    );

    if (data.attachment && data.attachment.length > 0) {
      formData.append("attachment", data.attachment[0]);
    }

    try {
      const response = await dispatch(markAttendance(formData)).unwrap();

      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "Attendence applied successfully!"
        );
      } else {
        toast.success("Attendence applied successfully!");
      }
      reset();
      onClose();
      dispatch(fetchAllAttendance());
    } catch (error: unknown) {
      let errorMessage = "Failed to apply leave.";
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
    <div>
      <Modal
        title={"Action.AddAttendence"}
        maxWidth="md"
        height={"h-auto overflow-x-hidden"}
        open={open}
        onClose={onClose}
        scroll="body"
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
            <Box display={"flex"} gap={2}>
              <RHFTextInput
                type="text"
                name="employeeName"
                placeholder={"Placeholder.EnterEmployeeName"}
                label={"Label.EmployeeName"}
                control={control}
                maxCharCount={20}
                required
                rules={{
                  required: "Full Name is required",
                  pattern: {
                    value: /^[A-Za-z\s.'-]+$/,
                    message:
                      "Only alphabets, spaces, dots, apostrophes, and hyphens allowed",
                  },
                  minLength: {
                    value: 2,
                    message: "Full Name must be at least 2 characters long",
                  },
                  maxLength: {
                    value: 50,
                    message: "Full Name must not exceed 50 characters",
                  },
                  validate: (value: string) => {
                    if (value.trim().length === 0) {
                      return "Name cannot be only spaces";
                    }
                    return true;
                  },
                }}
                icon={"Person"}
                className="mt"
              />
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
                icon="Badge"
              />

              <RHFDateInput
                name="attendanceDate"
                control={control}
                label="Label.Date"
                required
                rules={{
                  required: "Attendence Date is required",
                }}
              />
            </Box>
            <Box display={"flex"} gap={2}>
              <RHFListInput
                name="status"
                label="Label.Status"
                placeholder="Placeholder.SelectStatus"
                control={control}
                required
                rules={{
                  required: "Select status",
                  validate: (value: string) => {
                    const allowed = [
                      "present",
                      "absent",
                      "leave",
                      "wfh",
                      "late",
                      "half day",
                    ];
                    return allowed.includes(value) || "Invalid status selected";
                  },
                }}
                data={[
                  { id: "present", value: "Present" },
                  { id: "absent", value: "Absent" },
                  { id: "leave", value: "Leave" },
                  { id: "wfh", value: "WFH" },
                  { id: "late", value: "Late" },
                  { id: "half day", value: "Half Day" },
                ]}
                dataID="id"
                dataValue="value"
              />
              <RHFListInput
                name="attendanceType"
                placeholder={"Placeholder.SelectAttendenceType"}
                label={"Label.AttendanceType"}
                control={control}
                data={[
                  { id: "office", value: "Office" },
                  { id: "remote", value: "Remote" },
                  { id: "field", value: "Field" },
                ]}
                dataID="id"
                dataValue="value"
                rules={{
                  required: "Attendance type is required",
                  validate: (value: string) => {
                    const allowed = ["office", "remote", "field"];
                    if (!allowed.includes(value))
                      return "Invalid attendance type selected";
                    return true;
                  },
                }}
                required
              />

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
            </Box>
            <Box display="flex" gap={2} marginBottom={2}>
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
                icon="WorkspacePremium"
              />

              <RHFTimePicker
                name="inTime"
                label="In Time"
                control={control}
                required={true}
              />

              <RHFTimePicker
                name="outTime"
                label="Out Time"
                control={control}
                required
                rules={{
                  required: "Out Time is required",
                }}
              />
            </Box>
            <Box display={"flex"} gap={2} marginBottom={2}>
              <RHFTextArea
                name="reason"
                label="Label.Reason"
                placeholder="Placeholder.EnterReason"
                control={control}
                maxCharCount={300}
                helptooltip="Alphabets, numbers, and punctuation allowed"
                rules={{
                  required: "Reason is required",
                  minLength: {
                    value: 10,
                    message: "Reason must be at least 10 characters long",
                  },
                  maxLength: {
                    value: 300,
                    message: "Reason cannot exceed 300 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s.,'"\-()!?&@]+$/i,
                    message:
                      "Reason can only contain letters, numbers, spaces, and basic punctuation",
                  },
                  validate: {
                    noOnlyWhitespace: (value: string) =>
                      value.trim().length > 0 ||
                      "Reason cannot be only whitespace",
                  },
                }}
              />
            </Box>
            <HelpCharacterCount max={300} value={reasonChars} />
            <Box display={"flex"} textAlign={"center"}>
              <RHFFileInput
                name="attachment"
                control={control}
                label="Attachment"
                rules={{
                  required: "Attachment is required",
                  validate: {
                    acceptedFormats: (value: FileList) => {
                      if (!value?.[0]) return "File must be selected";
                      const allowedExtensions = [
                        ".pdf",
                        ".docx",
                        ".png",
                        ".jpg",
                        ".jpeg",
                        ".webp",
                      ];
                      const fileName = value[0].name.toLowerCase();
                      const isValid = allowedExtensions.some((ext) =>
                        fileName.endsWith(ext)
                      );
                      return (
                        isValid ||
                        "Only PDF, DOCX, or image files (png, jpg, jpeg, webp) are allowed"
                      );
                    },
                    maxSize: (value: FileList) =>
                      !value?.[0] ||
                      value[0].size <= 5 * 1024 * 1024 ||
                      "File size must be less than 5MB",
                    fileNameLength: (value: FileList) =>
                      !value?.[0] ||
                      value[0].name.length <= 100 ||
                      "Filename must not exceed 100 characters",
                  },
                }}
                multiple={false}
                accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
              />
            </Box>

            <Box textAlign="center" marginTop={4}>
              <MainButton
                ButtonName={`Apply Now`}
                type="submit"
                icon={"Send"}
                className="inline-block bg-gradient-to-r from-[#048b90] to-[#f35f07] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
              />
              <MainButton
                ButtonName="Reset"
                type="button"
                onClick={() => reset()}
                className="inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddAttendenceForm;
