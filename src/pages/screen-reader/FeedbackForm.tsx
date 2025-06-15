/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AlertMessage from "../../components/alert/AlertMessage";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import Modal from "../../components/modal/Modal";
import RHFListInput from "../../components/dropdowns/RHFListInput";
import RHFTextArea from "../../components/inputs/RHFTextArea";
import HelpCharacterCount from "../../components/typography/HelpCharacterCount";
import MainButton from "../../components/buttons/MainButton";
import { clearAlert, showSuccess } from "../../features/alertSlice/alertSlice";
import type { RootState } from "../../store/store";

interface FeedbackFormProps {
  open: boolean;
  onClose: () => void;
}
const FeedbackForm = ({ open, onClose }: FeedbackFormProps) => {
  const dispatch = useDispatch();
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

  const onSubmit = (data: any) => {
    dispatch(showSuccess("Feedback sumitted successfully"));
    console.log("feedback form submittinng data===>", data);
    setTimeout(() => {
      onClose(); // optional
    }, 5000);
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
              maxCharCount={20}
              required
              rules={{
                required: "Full Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters are allowed in full name",
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
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email address",
                },
              }}
              icon={"Email"}
            />
            <RHFListInput
              name="feedbackCategory"
              placeholder={"Placeholder.SelectFeedbackCategory"}
              label={"Label.FeedbackCategory"}
              control={control}
              data={[
                { id: "User_Experience", value: "user Experience" },
                { id: "Ui_Bugs", value: "Bugs" },
                { id: "Ui_Functionality", value: "Functionality" },
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
                required: "Mobile Number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
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
              helptooltip="Alphabets,Special Character Allowed"
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
