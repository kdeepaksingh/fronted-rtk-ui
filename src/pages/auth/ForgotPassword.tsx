import { useForm } from "react-hook-form";
import MainButton from "../../components/buttons/MainButton";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/store";
import { forgotPassword } from "../../features/auth/authSlice";

interface ForgotPasswordProps {
  open: boolean;
  onClose: () => void;
}

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = ({ open, onClose }: ForgotPasswordProps) => {
  const dispatch = useAppDispatch();
  const { control, watch, reset, handleSubmit } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordForm) => {
    const payload = {
      email: data.email,
    };

    try {
      const response = await dispatch(forgotPassword(payload)).unwrap();
      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "Reset link sent to your email!"
        );
        reset();
        onClose();
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to send reset email!";
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
        title={"Typo.ForgotPassword"}
        maxWidth="xs"
        height={"h-auto overflow-x-hidden"}
        open={open}
        onClose={onClose}
        scroll="body"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8">
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

            <div className="flex justify-end gap-0 mt-8">
              <MainButton ButtonName="Submit" type="submit" disabled={!email} />
              <MainButton
                ButtonName="Reset"
                type="button"
                onClick={() => reset()}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
