import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import registerBg from "../../assets/svg/register-bg.svg";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/alert/AlertMessage";
import { clearAlert, showError } from "../../features/alertSlice/alertSlice";
import { useAppDispatch, type RootState } from "../../store/store";
import Icon from "../../components/icon/Icon";
import PageTitle from "../../components/typography/PageTitle";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import MainButton from "../../components/buttons/MainButton";
import RHFRadioButtons from "../../components/inputs/RHFRadioButtons";
import { toast } from "react-toastify";
import { loginUser } from "../../features/auth/authSlice";

interface FormValues {
  loginType: "otp" | "password";
  emailOrMobile?: string;
  otp?: string;
  userId?: string;
  password?: string;
  captcha: string;
  email: string;
  mobileNumber: string;
  verificationCode: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state: RootState) => state.alert);
  const { control, reset, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      loginType: "password",
    },
  });
  const loginType = watch("loginType");
  const userId = watch("userId");
  const email = watch("email");
  const mobileNumber = watch("mobileNumber");
  const password = watch("password");
  const verificationCode = watch("verificationCode");
  const [captchaNum1, setCaptchaNum1] = useState(() =>
    Math.floor(Math.random() * 10)
  );
  const [captchaNum2, setCaptchaNum2] = useState(() =>
    Math.floor(Math.random() * 10)
  );
  const correctCaptchaAnswer = String(captchaNum1 + captchaNum2);

  const isFormValid =
    !!email && !!password && verificationCode?.trim() === correctCaptchaAnswer;

  const onSubmit = async (data: FormValues) => {
    if (!isFormValid) return;

    const payload = {
      email: data.email,
      password: data.password ?? "",
      verificationCode: data.verificationCode,
    };

    try {
      const response = await dispatch(loginUser(payload)).unwrap();
      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "User Logged-In successfully!"
        );
        reset();
        refreshCaptcha();
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      let errorMessage = "User Logging failed!";
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
      dispatch(showError(errorMessage));
    }
  };

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10));
    setCaptchaNum2(Math.floor(Math.random() * 10));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url("${registerBg}")` }}
    >
      <div className="max-w-md w-full rounded-xl shadow-xl border-[2px] border-orange-500 bg-white overflow-hidden p-1">
        <div className="flex flex-col items-center px-6 py-4">
          <AlertMessage
            message={alert.message}
            success={alert.success}
            onClose={() => dispatch(clearAlert())}
            autoCloseIn={3}
            type="snackbar"
            successSnack
          />
          <div className="w-28 h-28 overflow-hidden relative">
            <Icon name={"UserIcon"} />
          </div>
          <PageTitle
            text={"Header.LoginUser"}
            size={20}
            className="text-amber-900 mt-2 mb-2"
          />
          <hr className="border-t border-orange-300 border-[2px] w-full mt-2" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4 pb-4">
          <RHFRadioButtons
            name="loginType"
            control={control}
            label=""
            required={true}
            className="!mb-3 !flex !justify-center"
            row={true}
            data={[
              { key: "otp", label: "Mobile / Email OTP" },
              { key: "password", label: "Username / Password" },
            ]}
            rules={{ required: "Please select a login method" }}
          />

          {loginType === "otp" && (
            <>
              <div className="p-4">
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
                <MainButton
                  ButtonName={"Action.SendOTP"}
                  type="button"
                  className="h-9"
                />
              </div>
              <RHFTextInput
                type="tel"
                name="enteredOtp"
                placeholder={"Placeholder.EnterOtp"}
                label={"Label.OTP"}
                control={control}
                maxCharCount={6}
                required
                rules={{
                  required: "OTP required",
                  pattern: {
                    value: /^\d{1,6}$/,
                    message: "Enter a valid OTP code",
                  },
                }}
                className="w-1/2"
                icon={"Verified"}
              />
            </>
          )}

          {loginType === "password" && (
            <>
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
              <RHFTextInput
                type="password"
                name="password"
                placeholder={"Placeholder.EnterPassword"}
                label={"Label.Password"}
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
            </>
          )}

          <div className="flex items-center gap-2">
            <RHFTextInput
              type="tel"
              name="verificationCode"
              placeholder={"Placeholder.EnterVerificationCode"}
              label={"Label.VerificationCode"}
              control={control}
              maxCharCount={3}
              required
              rules={{
                required: "Verification code required",
                pattern: {
                  value: /^\d{1,3}$/,
                  message: "Enter a valid verification code",
                },
              }}
              className="w-1/2"
              icon={"Verified"}
            />
            <div className="bg-gray-100 px-4 py-2 rounded-md text-md font-semibold mt-[-15px] min-w-28">
              {captchaNum1} + {captchaNum2} = ?
            </div>
            <IconButton onClick={refreshCaptcha} style={{ marginTop: "-13px" }}>
              <Icon name={"RefreshIcon"} />
            </IconButton>
          </div>

          <div className="flex justify-center mt-4">
            <MainButton
              ButtonName={"Action.Reset"}
              type="button"
              onClick={handleReset}
            />

            <MainButton
              ButtonName={"Action.Submit"}
              type="submit"
              variant="outlined"
            />
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
            <Link
              to="/forgot-user-id"
              className="!text-orange-600 hover:underline"
            >
              Forgot User Id?
            </Link>
            <Link to="/register" className="!text-orange-600 hover:underline">
              New User? Register Here!
            </Link>
          </div>
        </form>
        <div className="bg-[#973308] text-center py-2 mt-4">
          <MainButton
            type="button"
            ButtonName={"Action.LoginWithParichay"}
            className="hover:!bg-[#d97706e9] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
