/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AlertMessage from "../../components/alert/AlertMessage";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import Modal from "../../components/modal/Modal";
import RHFListInput from "../../components/dropdowns/RHFListInput";
import RHFTextArea from "../../components/inputs/RHFTextArea";
import HelpCharacterCount from "../../components/typography/HelpCharacterCount";
import MainButton from "../../components/buttons/MainButton";
import { clearAlert } from "../../features/alertSlice/alertSlice";
import { useAppDispatch, type RootState } from "../../store/store";
import { toast } from "react-toastify";
import { createFeedback } from "../../features/feedback/feedbackSlice";

interface FeedbackFormProps {
  open: boolean;
  onClose: () => void;
}
const FeedbackForm = ({ open, onClose }: FeedbackFormProps) => {
  const dispatch = useAppDispatch();
  const alert = useSelector((state: RootState) => state.alert);
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      feedbackCategory: "",
      mobileNumber: "",
      comments: "",
    },
  });

  const commentChars = watch("comments");

  const handleReset = () => {
    reset(); // ✅ reset all fields
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await dispatch(createFeedback(data)).unwrap();

      toast.success(
        (response as { message?: string })?.message ||
          "Feedback submitted successfully!"
      );

      reset();
      onClose();
    } catch (error: unknown) {
      let errorMessage = "Failed to submit feedback.";
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
      <AlertMessage
        message={alert.message}
        success={alert.success}
        onClose={() => dispatch(clearAlert())}
        autoCloseIn={3}
        type="snackbar"
        successSnack
      />
      <Modal
        title={"Typo.ProvideFeedback"}
        maxWidth="xs"
        height={"h-auto overflow-x-hidden"}
        open={open}
        onClose={onClose}
        scroll="body"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3 mt-3">
            <RHFTextInput
              type="text"
              name="fullName"
              placeholder={"Placeholder.EnterFullName"}
              label={"Label.FullName"}
              control={control}
              maxCharCount={50}
              required
              rules={{
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Full Name cannot exceed 50 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s.'-]+$/,
                  message:
                    "Full Name can only include letters, spaces, apostrophes, hyphens, and periods",
                },
                validate: {
                  noDoubleSpaces: (value: string) =>
                    !/\s{2,}/.test(value) || "Avoid using multiple spaces",
                  noLeadingTrailingSpace: (value: string) =>
                    value.trim() === value ||
                    "Full Name cannot start or end with a space",
                },
              }}
              icon={"Person"}
              className="mt"
            />

            <RHFTextInput
              type="email"
              name="email"
              placeholder={"Placeholder.EnterEmail"}
              label={"Label.Email"}
              control={control}
              required
              rules={{
                required: "Email is required",
                minLength: {
                  value: 5,
                  message: "Email must be at least 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Email cannot exceed 100 characters",
                },
                pattern: {
                  // Accepts standard emails with subdomains, disallows invalid characters
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
                validate: {
                  noLeadingTrailingSpace: (value: string) =>
                    value.trim() === value ||
                    "Email cannot start or end with a space",
                  noDoubleDots: (value: string) =>
                    !value.includes("..") ||
                    "Email cannot contain consecutive dots",
                },
              }}
              icon={"Email"}
            />

            <RHFListInput
              name="feedbackCategory"
              placeholder={"Placeholder.SelectFeedbackCategory"}
              label={"Label.FeedbackCategory"}
              control={control}
              rules={{
                required: "Feedback category is required",
                validate: {
                  isValidOption: (value: string) => {
                    const validOptions = [
                      "User_Experience",
                      "Ui_Functionality",
                      "Suggestion_Improvements",
                    ];
                    return (
                      validOptions.includes(value) ||
                      "Please select a valid feedback category"
                    );
                  },
                },
              }}
              data={[
                { id: "User_Experience", value: "User Experience" },
                { id: "Ui_Functionality", value: "Functionality" },
                {
                  id: "Suggestion_Improvements",
                  value: "Suggestions and Improvements",
                },
              ]}
              dataID="id"
              dataValue="value"
            />

            <RHFTextInput
              type="tel"
              name="mobileNumber"
              placeholder={"Placeholder.EnterMobileNumber"}
              label={"Label.MobileNumber"}
              control={control}
              maxCharCount={10}
              required
              rules={{
                required: "Mobile number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be exactly 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile number must be exactly 10 digits",
                },
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
                },
                validate: {
                  isNumeric: (value: string) =>
                    /^\d+$/.test(value) ||
                    "Mobile number must contain only digits",
                  noRepeatedDigits: (value: string) =>
                    !/^(.)\1+$/.test(value) || "All digits cannot be the same",
                },
              }}
              icon={"PhoneIphone"}
            />

            <RHFTextArea
              name="comments"
              label="Comments"
              placeholder="Enter Your Comments"
              control={control}
              maxCharCount={300}
              helptooltip="Alphabets, numbers, and special characters allowed"
              required
              rules={{
                required: "Comments are required",
                minLength: {
                  value: 10,
                  message: "Comments must be at least 10 characters",
                },
                maxLength: {
                  value: 300,
                  message: "Comments cannot exceed 300 characters",
                },
                pattern: {
                  value:
                    /^[A-Za-z0-9\s.,!?'"@#$%^&*()_+\-={}\[\]:;<>|\\/`~\n\r]*$/,
                  message:
                    "Comments can only include alphabets, numbers, and standard special characters",
                },
                validate: {
                  notOnlyWhitespace: (value: string) =>
                    value.trim().length > 0 || "Comments cannot be only spaces",
                  noSameCharRepeated: (value: string) =>
                    !/^([a-zA-Z])\1{9,}$/.test(value) ||
                    "Don't repeat the same character excessively",
                },
              }}
            />

            <HelpCharacterCount max={300} min={3} value={commentChars} />

            <div className="flex justify-end gap-0 mt-4">
              <MainButton ButtonName="Submit" type="submit" />
              <MainButton
                ButtonName="Reset"
                type="button"
                onClick={handleReset}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FeedbackForm;
