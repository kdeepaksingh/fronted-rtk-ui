import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import registerBg from "../../assets/svg/register-bg.svg";
import { useAppDispatch, type RootState } from "../../store/store";
import Icon from "../../components/icon/Icon";
import PageTitle from "../../components/typography/PageTitle";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import MainButton from "../../components/buttons/MainButton";
import AlertMessage from "../../components/alert/AlertMessage";
import { clearAlert, showError } from "../../features/alertSlice/alertSlice";
import Modal from "../../components/modal/Modal";
import { registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

interface FormData {
  userName: string;
  email: string;
  emailOTP: string;
  mobileOTP: string;
  mobileNumber: string;
  password: string;
  verificationCode: string;
}

const RegisterWithVerification = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state: RootState) => state.alert);
  const { control, handleSubmit, reset, watch } = useForm<FormData>();
  const [isParichayModal, setIsParichayModal] = useState(false);
  const [isEmailOTPValid, setIsEmailOTPValid] = useState(false);
  const [isMobileOTPValid, setIsMobileOTPValid] = useState(false);

  const userName = watch("userName");
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
    !!userName &&
    !!email &&
    !!mobileNumber &&
    !!password &&
    verificationCode?.trim() === correctCaptchaAnswer;

  useEffect(() => {
    const emailOTP = watch("emailOTP");
    setIsEmailOTPValid(/^\d{6}$/.test(emailOTP));
  }, [watch("emailOTP")]);

  useEffect(() => {
    const mobileOTP = watch("mobileOTP");
    setIsMobileOTPValid(/^\d{6}$/.test(mobileOTP));
  }, [watch("mobileOTP")]);

  const handleReset = () => {
    reset();
  };

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10));
    setCaptchaNum2(Math.floor(Math.random() * 10));
  };

  const onSubmit = async (data: FormData) => {
    console.log("data of registeration=======>", data);
    const payload = {
      name: data.userName,
      email: data.email,
      mobileNo: data.mobileNumber,
      password: data.password,
      verificationCode: data.verificationCode,
      emailOTP: data.emailOTP,
      mobileOTP: data.mobileOTP,
    };

    try {
      const response = await dispatch(registerUser(payload)).unwrap();
      if ((response as { message?: string })?.message) {
        toast.success(
          (response as { message?: string })?.message ||
            "User Registration successfully!"
        );
        reset();
        refreshCaptcha();
        navigate("/login");
      }
    } catch (error: unknown) {
      let errorMessage = "User Registration failed!";
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
            autoCloseIn={5}
            type="snackbar"
            successSnack
          />
          <div className="w-28 h-28 overflow-hidden relative">
            <Icon name={"UserIcon"} />
          </div>
          <PageTitle
            text={"Header.NewUserRegister"}
            size={20}
            className="text-amber-900 mt-2 mb-2"
          />
          <hr className="border-t border-[2px] border-orange-300 w-full mt-2" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-4 pb-4">
          <RHFTextInput
            type="text"
            name="userName"
            label={"Label.UserName"}
            placeholder={"Placeholder.EnterUserName"}
            control={control}
            icon="Person"
            maxCharCount={25}
            rules={{
              required: "User Name is required",
              minLength: {
                value: 3,
                message: "User Name must be at least 3 characters",
              },
              maxLength: {
                value: 25,
                message: "User Name cannot exceed 25 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters are allowed in user name",
              },
            }}
            required
          />
          <div className="flex items-center space-x-2">
            <RHFTextInput
              type="email"
              name="email"
              placeholder={"Placeholder.EnterEmail"}
              label={"Label.Email"}
              control={control}
              required
              rules={{
                required: "Email is required",
                maxLength: {
                  value: 50,
                  message: "Email cannot exceed 50 characters",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email address",
                },
              }}
              icon={"Email"}
              className="!w-1/2"
            />

            <MainButton
              ButtonName={"Action.SendOTP"}
              type="button"
              className="!min-w-24 h-9 !mt-[-16px]"
              disabled={!email}
              variant="outlined"
            />
          </div>
          <RHFTextInput
            type="tel"
            name="emailOTP"
            placeholder={"Placeholder.EnterEmailOTP"}
            label={"Label.EmailOTP"}
            control={control}
            maxCharCount={6}
            required
            rules={{
              required: "Email OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              maxLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "Enter a valid 6-digit Email OTP",
              },
            }}
            className="w-1/2"
            icon={isEmailOTPValid ? "Verified" : "Error"}
            iconColor={isEmailOTPValid ? "text-green-600" : "text-red-500"}
          />
          <div className="flex items-center space-x-2">
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
              }}
              icon={"PhoneIphone"}
            />

            <MainButton
              ButtonName={"Action.SendOTP"}
              type="button"
              className="!min-w-24 h-9 !mt-[-16px]"
              disabled={!mobileNumber}
              variant="outlined"
            />
          </div>

          <RHFTextInput
            type="tel"
            name="mobileOTP"
            placeholder={"Placeholder.EnterMobileOTP"}
            label={"Label.MobileOTP"}
            control={control}
            maxCharCount={6}
            required
            rules={{
              required: "Mobile OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              maxLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
              pattern: {
                value: /^\d{6}$/,
                message: "Enter a valid 6-digit Mobile OTP",
              },
            }}
            className="w-1/2"
            icon={isMobileOTPValid ? "Verified" : "Error"}
            iconColor={isMobileOTPValid ? "text-green-600" : "text-red-500"}
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
              maxLength: {
                value: 20,
                message: "Password should not exceed 20 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                message:
                  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
              },
            }}
            icon={"Lock"}
          />

          <div className="flex items-center space-x-2">
            <RHFTextInput
              type="tel"
              name="verificationCode"
              placeholder={"Placeholder.EnterVerificationCode"}
              label={"Label.VerificationCode"}
              control={control}
              maxCharCount={3}
              required
              rules={{
                required: "Verification code is required",
                minLength: {
                  value: 1,
                  message: "Verification code must be at least 1 digit",
                },
                maxLength: {
                  value: 3,
                  message: "Verification code cannot exceed 3 digits",
                },
                pattern: {
                  value: /^\d{1,3}$/,
                  message: "Enter a valid verification code",
                },
                validate: (value: string) =>
                  value === correctCaptchaAnswer || "Captcha is incorrect",
              }}
              className="w-1/2"
              icon={"Verified"}
            />

            <div className="bg-gray-100 px-4 py-2 rounded-md text-md font-semibold mt-[-15px] min-w-28 ">
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
              disabled={!isFormValid}
              variant="outlined"
            />
          </div>

          <div className="flex justify-end font-semibold text-sm text-orange-600 mt-2">
            <span>Existing User?&nbsp;</span>
            <Link to="/login" className="underline font-semibold">
              Login Here!
            </Link>
          </div>
        </form>

        <div className="bg-[#973308] text-center py-2 mt-4">
          <MainButton
            type="button"
            ButtonName={"Action.LoginWithParichay"}
            className="hover:!bg-[#d97706] text-white"
            onClick={() => setIsParichayModal(true)}
          />
        </div>
      </div>

      <Modal
        title={"Header.ParichayLogin"}
        maxWidth="xs"
        height={"h-auto overflow-x-hidden"}
        onClose={() => setIsParichayModal(false)}
        open={isParichayModal}
        scroll="body"
      >
        <form className="mt-4 p-3">
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
          <div className="flex justify-center gap-0 mt-4">
            <MainButton ButtonName="Submit" type="submit" />
            <MainButton
              ButtonName="Reset"
              type="button"
              onClick={handleReset}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RegisterWithVerification;
