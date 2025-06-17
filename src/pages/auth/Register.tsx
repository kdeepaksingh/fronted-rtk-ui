import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import registerBg from "../../assets/svg/register-bg.svg";
import type { RootState } from "../../store/store";
import Icon from "../../components/icon/Icon";
import PageTitle from "../../components/typography/PageTitle";
import RHFTextInput from "../../components/inputs/RHFTextInput";
import MainButton from "../../components/buttons/MainButton";
import AlertMessage from "../../components/alert/AlertMessage";
import { clearAlert, showSuccess } from "../../features/alertSlice/alertSlice";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  verificationCode: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);
  const { control, handleSubmit, reset, watch } = useForm<FormData>();

  const userName = watch("userName");
  const email = watch("email");
  const mobileNumber = watch("mobileNumber");
  const verificationCode = watch("verificationCode");
  // const [loginData, setLoginData] = useState({
  //   userName: "",
  //   email: "",
  //   mobileNumber: "",
  //   verificationCode: "",
  // });

  const [captchaNum1, setCaptchaNum1] = useState(() =>
    Math.floor(Math.random() * 10)
  );
  const [captchaNum2, setCaptchaNum2] = useState(() =>
    Math.floor(Math.random() * 10)
  );
  const correctCaptchaAnswer = String(captchaNum1 + captchaNum2);

  const isFormValid =
    userName &&
    email?.trim() &&
    mobileNumber &&
    verificationCode?.trim() === correctCaptchaAnswer;

  const handleReset = () => {
    reset();
  };

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10));
    setCaptchaNum2(Math.floor(Math.random() * 10));
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    dispatch(showSuccess("Registration successfully!"));
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
            text={"Header.NewUserRegister"}
            size={20}
            className="text-amber-900 mt-2 mb-2"
          />
          <hr className="border-t border-orange-300 w-full mt-2" />
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
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid digit or number for verification code",
                },
              }}
              className="w-1/2"
              icon={"Verified"}
            />

            <div className="bg-gray-100 px-4 py-2 rounded-md text-md font-semibold mt-[-15px]">
              {captchaNum1} + {captchaNum2} = ?
            </div>
            <IconButton onClick={refreshCaptcha} style={{ marginTop: "-13px" }}>
              <Icon name={"RefreshIcon"} />
            </IconButton>
          </div>

          <div className="flex justify-center mt-4">
            <MainButton
              ButtonName={"Action.Submit"}
              type="button"
              disabled={!isFormValid}
              variant="outlined"
            />
            <MainButton
              ButtonName={"Action.Reset"}
              type="button"
              onClick={handleReset}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
