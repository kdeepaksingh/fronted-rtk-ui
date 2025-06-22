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

type FormValues = {
  leaveType: "casual" | "sick" | "earned";
  dayType: "full" | "half";
  fromDate: string;
  toDate: string;
  reason: string;
  includeWeekend: boolean;
  applyingTo: string;
  ccEmails: string[];
  attachment: FileList | null;
};

export default function ApplyLeaveMuiForm() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
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

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      attachment: data.attachment?.[0]?.name || "No file",
    };
    console.log("Leave Application Submitted:", payload);
    reset();
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
                { id: "compoff", value: "Comp - Off Leave" },
              ]}
              rules={{ required: "Select leave type" }}
              dataID="id"
              dataValue="value"
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
              rules={{ required: "Select Day type" }}
              dataID="id"
              dataValue="value"
              required
            />
          </Box>
          <Box display="flex" gap={2} marginBottom={2}>
            <RHFDateInput
              name="fromDate"
              control={control}
              label="Form Date"
              rules={{ required: "Date is required" }}
              required
            />

            <RHFDateInput
              name="toDate"
              control={control}
              label="To Date"
              rules={{ required: "Date is required" }}
              required
              icon="DateCalendarMonth"
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
              ]}
              rules={{ required: "Manager email required" }}
              dataID="id"
              dataValue="value"
              required
            />

            <RHFTextInput
              type="email"
              name="ccEmails"
              placeholder={"Placeholder.EnterCCEmail"}
              label={"Label.CCEmail"}
              control={control}
              required
              rules={{
                required: "CC-Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email address",
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
              helptooltip="Alphabets,Special Character Allowed"
            />
          </Box>
          <HelpCharacterCount max={300} value={reasonChars} />
          <Box display={"flex"} textAlign={"center"}>
            <RHFFileInput
              name="attachment"
              control={control}
              label="Attachment"
              rules={{ required: "File is required" }}
              multiple={false}
              accept=".pdf,.docx"
            />

            <div className="!mt-3.5">
              <SwitchButton
                name="includeWeekend"
                title="Include weekends"
                label="Include weekends"
                control={control}
              />
            </div>
          </Box>

          <Box textAlign="center" marginTop={4}>
            <MainButton
              ButtonName={`${isSubmitting} ? "Submitting..." : "Apply Now"`}
              type="submit"
              disabled={isSubmitting}
              className="inline-block bg-gradient-to-r from-[#048b90] to-[#f35f07] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
            />
            <MainButton
              ButtonName="Reset"
              type="button"
              className="inline-block bg-gradient-to-r from-[#09756f] to-[#1c3409] !px-3 !py-2 !rounded-lg !font-semibold hover:!bg-orange-700 !transition"
            />
          </Box>
        </form>
      </Box>
    </motion.div>
  );
}
