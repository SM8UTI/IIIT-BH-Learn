/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Typography, Dialog, Button } from "@material-tailwind/react";
import OTPInput from "react-otp-input";
import Lottie from "lottie-react";
import { RiArrowLeftLine } from "react-icons/ri";

import { API_URL } from "../../utils/constant";
import RouterData from "../../router/RouterData";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/InputField";
import success from "../../assets/success2.json";
import logo from "../../assets/logo.svg";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password | IIIT-BH Learn";
  }, []);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    otp: "",
    msg: "",
  });
  const [successModal, setSuccessModal] = useState(false);

  const navigate = useNavigate();

  const validateInput = useCallback((input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@iiit-bh\.ac\.in$/;
    return emailRegex.test(input);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));

      if (name === "email") {
        setErrors((prev) => ({
          ...prev,
          email: !value
            ? "Email is required"
            : !validateInput(value)
            ? "Enter a valid IIIT-BH email"
            : "",
        }));
      }
    },
    [validateInput]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: "", newPassword: "", otp: "", msg: "" });

    if (!data.email) {
      setLoading(false);
      return setErrors({
        email: "Please enter your email address",
        newPassword: "",
        otp: "",
        msg: "",
      });
    }

    try {
      const res = await axios.post(
        `${API_URL}/user/forgetpassword?email=${data.email}`
      );
      toast.success(res.data.message, {
        duration: 4000,
        position: "top-center",
        className: "font-primary text-sm",
      });
      setOtpModal(true);
    } catch (error) {
      setErrors({
        msg: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: "", newPassword: "", otp: "", msg: "" });

    if (otp.length !== 6) {
      setLoading(false);
      return setErrors({ msg: "Please enter a valid OTP" });
    }

    if (!data.newPassword) {
      setLoading(false);
      return setErrors({ msg: "Please enter your new password" });
    }

    try {
      await axios.post(
        `${API_URL}/user/forgetpassword/verify?email=${data.email}&otp=${otp}&new_password=${data.newPassword}`
      );
      setSuccessModal(true);
      setOtpModal(false);
      setData({ email: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setErrors({
        msg: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full h-dvh overflow-hidden overflow-y-scroll">
      <div className="w-full mt-28">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="IIIT BH Learn"
              className="w-full max-w-[180px]"
            />
          </Link>
          <Typography variant="h2" className="font-primary mt-4 text-center">
            {otpModal ? "Verify Email Address" : "Forgot Password"}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-primary text-text/70 text-center text-sm max-w-[400px] mt-2"
          >
            {otpModal
              ? "Enter the OTP sent to your email address to reset your password."
              : "Enter your email address to reset your password by receiving an OTP."}
          </Typography>
        </div>
        {otpModal ? (
          <OtpForm
            data={data}
            otp={otp}
            setOtp={setOtp}
            handleChange={handleChange}
            handleOtpSubmit={handleOtpSubmit}
            loading={loading}
            errors={errors}
          />
        ) : (
          <EmailForm
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            errors={errors}
            navigate={navigate}
          />
        )}
      </div>
      <SuccessModal
        open={successModal}
        handleOpen={() => setSuccessModal(false)}
        navigate={navigate}
      />
    </div>
  );
};

const OtpForm = ({
  data,
  otp,
  setOtp,
  handleChange,
  handleOtpSubmit,
  loading,
  errors,
}) => (
  <div className="flex flex-col justify-center gap-8 relative mb-28">
    <Typography
      variant="paragraph"
      className="text-text/60 font-primary mt-4 text-center"
    >
      OTP sent to <span className="text-primary underline">{data.email}</span>
    </Typography>
    <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={""}
      inputType="number"
      containerStyle="flex flex-row gap-4 justify-center rounded-md flex-wrap"
      inputStyle="!w-10 sm:!w-14 !h-12 bg-black2 text-text text-center rounded-md border border-text/20 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 font-primary font-normal text-lg"
      renderInput={(props) => <input {...props} />}
    />
    <div className="w-full max-w-[440px] mx-auto flex flex-col gap-4 px-4">
      <InputField
        id="newPassword"
        label="New Password"
        type="password"
        placeholder="********"
        value={data.newPassword}
        onChange={handleChange}
      />
      <InputField
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="********"
        value={data.confirmPassword}
        onChange={handleChange}
      />
    </div>
    <PrimaryButton
      onClick={handleOtpSubmit}
      loading={loading}
      loadingText="Changing..."
      disabled={loading}
      className="max-w-max mx-auto"
    >
      Change Passwords
    </PrimaryButton>
    {errors.msg && <ErrorMessage message={errors.msg} />}
  </div>
);

const EmailForm = ({
  data,
  handleChange,
  handleSubmit,
  loading,
  errors,
  navigate,
}) => (
  <form
    className="flex flex-col gap-4 px-4 mt-6 w-full max-w-[400px] mx-auto"
    onSubmit={handleSubmit}
  >
    <InputField
      id="email"
      label="IIIT-BH Email"
      type="text"
      placeholder="Enter your IIIT-BH email"
      value={data.email}
      onChange={handleChange}
      error={errors.email}
    />
    <PrimaryButton
      type="submit"
      loading={loading}
      loadingText="Sending..."
      disabled={loading || !data.email}
    >
      Send OTP
    </PrimaryButton>
    <Button
      className="flex flex-row items-center justify-center gap-2 text-sm bg-transparent text-text/70 capitalize font-medium shadow-none hover:shadow-none font-primary"
      onClick={() => navigate(RouterData.auth.login)}
    >
      <RiArrowLeftLine />
      <span>Go back</span>
    </Button>
    {errors.msg && <ErrorMessage message={errors.msg} />}
  </form>
);

const ErrorMessage = ({ message }) => (
  <div className="w-full mx-auto bg-red-500/5 rounded-full mt-2 px-3 py-2 border-red-500 border">
    <Typography
      variant="paragraph"
      className="text-red-500 text-sm font-primary text-center"
    >
      {message}
    </Typography>
  </div>
);

const SuccessModal = ({ open, handleOpen, navigate }) => (
  <Dialog open={open} handler={handleOpen} className="bg-white pb-10 relative">
    <div>
      <Lottie animationData={success} loop className="w-[300px] mx-auto" />
      <div className="flex flex-col gap-1 items-center justify-center w-full max-w-[350px] mx-auto text-center">
        <Typography variant="h3" className="text-text font-primary">
          Your Password has been changed successfully.
        </Typography>
        <Typography variant="paragraph" className="text-text/80 font-primary">
          You can now sign in with your new password.
        </Typography>
        <div className="button-container max-w-max w-full mt-4">
          <PrimaryButton
            onClick={() => {
              handleOpen();
              navigate(RouterData.auth.login);
            }}
          >
            Sign in
          </PrimaryButton>
        </div>
      </div>
    </div>
  </Dialog>
);

export default ForgotPassword;
