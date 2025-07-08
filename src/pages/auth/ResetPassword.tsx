import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import MainButton from "../../components/buttons/MainButton";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/store";
import { resetPassword } from "../../features/auth/authSlice";
import CommonTitle from "../../components/typography/CommonTitle";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await dispatch(
        resetPassword({ token: token || "", newPassword: data.newPassword })
      ).unwrap();

      toast.success(response?.message || "Password reset successful!!");
      reset();
      navigate("/login");
    } catch (err) {
      toast.error("Password reset failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <CommonTitle text="Reset Your Password" className="mb-8" />

        <RHFTextInput
          type="password"
          name="newPassword"
          placeholder={"Placeholder.EnterNewPassword"}
          label={"Label.NewPassword"}
          control={control}
          required
          rules={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/,
              message:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
            },
          }}
          icon={"Lock"}
        />

        <RHFTextInput
          type="password"
          name="confirmPassword"
          placeholder={"Placeholder.EnterConfirmPassword"}
          label={"Label.ConfirmPassword"}
          control={control}
          required
          rules={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/,
              message:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
            },
          }}
          icon={"Lock"}
        />

        <div className="mt-6 flex justify-center">
          <MainButton type="submit" ButtonName="Submit" />
          <MainButton
            type="button"
            ButtonName="Reset"
            onClick={() => reset()}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
