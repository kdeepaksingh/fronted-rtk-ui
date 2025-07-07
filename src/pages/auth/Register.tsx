import { useState } from "react";
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
  mobileNumber: string;
  password: string;
  verificationCode: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state: RootState) => state.alert);
  const { control, handleSubmit, reset, watch } = useForm<FormData>();
  const [isParichayModal, setIsParichayModal] = useState(false);

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

  const handleReset = () => {
    reset();
  };

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10));
    setCaptchaNum2(Math.floor(Math.random() * 10));
  };

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.userName,
      email: data.email,
      mobileNo: data.mobileNumber,
      password: data.password,
      verificationCode: data.verificationCode,
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
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters are allowed in user name",
              },
            }}
            required
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
                required: "Verification code required",
                pattern: {
                  value: /^\d{1,3}$/,
                  message: "Enter a valid verification code",
                },
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

export default Register;
