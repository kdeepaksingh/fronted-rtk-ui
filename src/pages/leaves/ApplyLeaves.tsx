import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import RHFListInput from "../../components/dropdowns/RHFListInput";
import RHFDateInput from "../../components/inputs/RHFDateInput";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import RHFTextArea from "../../components/inputs/RHFTextArea";
import HelpCharacterCount from "../../components/typography/HelpCharacterCount";
import MainButton from "../../components/buttons/MainButton";
import RHFFileInput from "../../components/inputs/RHFFileInput";
import SwitchButton from "../../components/switchbutton/SwitchButton";
import CommonTitle from "../../components/typography/CommonTitle";
import colors from "../../color";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/store";
import { applyLeave } from "../../features/leave/leaveSlice";
import { useNavigate } from "react-router-dom";

type FormValues = {
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
};

export default function ApplyLeaveMuiForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      employeeId: "",
      leaveType: "casual",
      dayType: "full",
      fromDate: "",
      toDate: "",
      reason: "",
      includeWeekend: false,
      applyingTo: "",
      ccEmails: [],
      attachment: null,
    },
  });
  const reasonChars = watch("reason");

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "attachment" && value instanceof FileList) {
        if (value.length > 0) {
          formData.append("attachment", value[0]);
        }
      } else if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    // (
    //   Object.entries(data) as [keyof FormValues, FormValues[keyof FormValues]][]
    // ).forEach(([key, value]) => {
    //   if (key === "attachment" && value instanceof FileList) {
    //     if (value.length > 0) {
    //       formData.append("attachment", value[0]);
    //     }
    //   } else if (Array.isArray(value)) {
    //     formData.append(key, value.join(",")); // e.g., ccEmails
    //   } else if (typeof value === "boolean") {
    //     formData.append(key, value ? "true" : "false");
    //   } else if (typeof value === "string") {
    //     formData.append(key, value);
    //   }
    // });

    try {
      const response = await dispatch(applyLeave(formData)).unwrap();

      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "Leave applied successfully!"
        );
      } else {
        toast.success("Leave applied successfully!");
      }
      navigate("/dashboard/leave-management");
      reset();
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Box
        maxWidth={800}
        mx="auto"
        mt={1}
        mb={1}
        p={8}
        bgcolor={`${colors["ui-card-light"]}`}
        borderRadius={2}
        boxShadow={3}
        border={"2px solid orange"}
      >
        <CommonTitle
          text={"Header.ApplyForLeave"}
          icon="Approval"
          className="w-full text-orange-600 flex justify-center !mt-[-30px] mb-6 uppercase"
        />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} gap={2}>
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

            <RHFListInput
              name="leaveType"
              placeholder={"Placeholder.SelectLeaveType"}
              label={"Label.LeaveType"}
              control={control}
              data={[
                { id: "casual", value: "Casual Leave" },
                { id: "sick", value: "Sick Leave" },
                { id: "earned", value: "Earned Leave" },
                { id: "short", value: "Short Leave" },
                { id: "breavement", value: "Breavement Leave" },
                { id: "compoff", value: "Comp - Off Leave" },
              ]}
              dataID="id"
              dataValue="value"
              rules={{
                required: "Leave type is required",
                validate: (value: string) => {
                  const allowed = [
                    "casual",
                    "sick",
                    "earned",
                    "short",
                    "breavement",
                    "compoff",
                  ];
                  if (!allowed.includes(value))
                    return "Invalid leave type selected";
                  return true;
                },
              }}
              required
            />

            <RHFListInput
              name="dayType"
              placeholder={"Placeholder.SelectDayType"}
              label={"Label.DayType"}
              control={control}
              data={[
                { id: "full", value: "Full Day" },
                { id: "half", value: "Half Day" },
              ]}
              dataID="id"
              dataValue="value"
              rules={{
                required: "Day type is required",
                validate: (value: string) => {
                  const allowed = ["full", "half"];
                  if (!allowed.includes(value))
                    return "Invalid day type selected";
                  if (typeof value !== "string") return "Invalid input format";
                  return true;
                },
              }}
              required
            />
          </Box>
          <Box display="flex" gap={2} marginBottom={2}>
            <RHFDateInput
              name="fromDate"
              control={control}
              label="Label.FromDate"
              required
              rules={{
                required: "From Date is required",
                // validate: {
                //   notInPast: (value: string) =>
                //     new Date(value).setHours(0, 0, 0, 0) >=
                //       new Date().setHours(0, 0, 0, 0) ||
                //     "From Date cannot be in the past",
                //   isValidDate: (value: string) =>
                //     !isNaN(Date.parse(value)) || "Invalid date format",
                // },
              }}
            />

            <RHFDateInput
              name="toDate"
              control={control}
              label="Label.ToDate"
              required
              icon="DateCalendarMonth"
              rules={{
                required: "To Date is required",
                // validate: {
                //   isValidDate: (value: string) =>
                //     !isNaN(Date.parse(value)) || "Invalid date format",
                //   notInPast: (value: string) =>
                //     new Date(value).setHours(0, 0, 0, 0) >=
                //       new Date().setHours(0, 0, 0, 0) ||
                //     "To Date cannot be in the past",
                //   isAfterFromDate: (toDate: string) => {
                //     const fromDate = watch("fromDate");
                //     if (!fromDate) return true;
                //     return (
                //       new Date(toDate).setHours(0, 0, 0, 0) >=
                //         new Date(fromDate).setHours(0, 0, 0, 0) ||
                //       "To Date cannot be before From Date"
                //     );
                //   },
                // },
              }}
            />
          </Box>
          <Box display={"flex"} gap={2}>
            <RHFListInput
              name="applyingTo"
              placeholder={"Placeholder.SelectApplyTo"}
              label={"Label.ApplyTo"}
              control={control}
              data={[
                { id: "manager", value: "manager@company.com" },
                { id: "teamlead", value: "teamlead@company.com" },
                { id: "hr", value: "hr@company.com" },
                { id: "cto", value: "cto@company.com" },
                { id: "ceo", value: "ceo@company.com" },
                { id: "admin", value: "admin@company.com" },
                { id: "supervisor", value: "supervisor@company.com" },
                { id: "projectlead", value: "projectlead@company.com" },
                { id: "director", value: "director@company.com" },
              ]}
              dataID="id"
              dataValue="value"
              required
              rules={{
                required: "Approver email is required",
                validate: {
                  isValidSelection: (value: string) =>
                    value !== "" || "Please select a valid approver",
                  // isInAllowedEmails: (value: string) => {
                  //   const allowedEmails = [
                  //     "manager@company.com",
                  //     "teamlead@company.com",
                  //     "hr@company.com",
                  //     "cto@company.com",
                  //     "ceo@company.com",
                  //     "admin@company.com",
                  //     "supervisor@company.com",
                  //     "projectlead@company.com",
                  //     "director@company.com",
                  //   ];
                  //   return (
                  //     allowedEmails.includes(value) ||
                  //     "Selected email is not allowed"
                  //   );
                  // },
                },
              }}
            />

            <RHFTextInput
              type="email"
              name="ccEmails"
              placeholder={"Placeholder.EnterCCEmail"}
              label={"Label.CCEmail"}
              control={control}
              required
              rules={{
                required: "CC email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email address",
                },
                minLength: {
                  value: 6,
                  message: "Email must be at least 6 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Email must not exceed 100 characters",
                },
                validate: {
                  noSpaces: (value: string) =>
                    !/\s/.test(value) || "Email must not contain spaces",
                  noSpecialCharsAtStart: (value: string) =>
                    !/^[^a-zA-Z0-9]/.test(value) ||
                    "Email cannot start with a special character",
                  domainCheck: (value: string) =>
                    value.includes(".") || "Email must contain a valid domain",
                },
              }}
              icon={"Email"}
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

            <div className="!mt-3.5">
              <SwitchButton
                name="includeWeekend"
                title="Include weekends"
                label="Include weekends"
                control={control}
              />

              {/* <SwitchButton
                name="includeWeekend"
                title="Include weekends"
                label="Include weekends"
                control={control}
                rules={{
                  required:
                    "Please confirm whether weekends should be included",
                  validate: (val) => {
                    if (watch("leaveType") === "earned" && !val) {
                      return "Earned leaves require weekends to be included";
                    }
                    return true;
                  },
                }}
              /> */}
            </div>
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
    </motion.div>
  );
}
