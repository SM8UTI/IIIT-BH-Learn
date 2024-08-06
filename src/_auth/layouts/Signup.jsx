/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import logo from "../../assets/logo.svg";
import RouterData from "../../router/RouterData";
import { Typography, Dialog } from "@material-tailwind/react";
import OTPInput from "react-otp-input";
import Lottie from "lottie-react";
import success from "../../assets/success2.json";
import toast from "react-hot-toast";

const initialData = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  apimsg: "",
  username: "",
  password: "",
  name: "",
  email: "",
  confirmPassword: "",
};

const Signup = () => {
  useEffect(() => {
    document.title = "Signup | IIIT-BH Learn";
  }, []);

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const navigate = useNavigate();

  const validations = useMemo(
    () => ({
      username: (value) =>
        value.length < 8 || value.length > 30
          ? "Username must be between 8 and 30 characters"
          : "",
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters long" : "",
      confirmPassword: (value) =>
        value !== data.password ? "Passwords do not match" : "",
      email: (value) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@iiit-bh\.ac\.in$/;
        return !emailRegex.test(value)
          ? "Please enter a valid IIIT-BH email address"
          : "";
      },
      name: (value) => (value.trim().length === 0 ? "Name is required" : ""),
    }),
    [data.password]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: validations[name] ? validations[name](value) : "",
        apimsg: "",
      }));
    },
    [validations]
  );

  const isFormValid = useMemo(
    () =>
      Object.values(errors).every((error) => error === "") &&
      Object.values(data).every((value) => value !== ""),
    [errors, data]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isFormValid) return;

      setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/users/signup`,
          {
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.data.message === "OTP sent successfully") {
          toast.success("OTP sent successfully", {
            duration: 4000,
            position: "top-center",
            className: "font-primary text-sm",
          });
          setOtpModal(true);
        } else {
          setErrors((prev) => ({
            ...prev,
            apimsg: response.data.message || "Signup failed",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apimsg:
            error.response?.data?.message || error.message || "Signup failed",
        }));
      } finally {
        setLoading(false);
      }
    },
    [data, isFormValid]
  );

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP", {
        duration: 4000,
        position: "top-center",
        className: "font-primary text-sm",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/users/signup/verify?otp=${otp}`,
        {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      if (res.data.message === "User created successfully") {
        setLoading(false);
        setSuccessModal(true);
        setOtpModal(false);
        setData(initialData);
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      setErrors({
        ...errors,
        apimsg:
          error.response?.data?.message ||
          "An error occurred while verifying the OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full h-dvh overflow-hidden overflow-y-scroll">
      <div className="w-full my-20">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="IIIT BH Learn"
              className="w-full max-w-[180px]"
            />
          </Link>
          <Typography variant="h2" className="font-primary mt-4 text-center">
            {otpModal ? "Verify Account" : "Create Your Account"}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-primary text-text/70 text-center text-sm max-w-[400px] mt-2"
          >
            {otpModal
              ? "Enter the OTP sent to your email and verify your account."
              : "Hey there! Ready to join the party. We just need a few details from you to get started. Let's do this!"}
          </Typography>
        </div>
        {otpModal ? (
          <OTPVerificationModal
            otp={otp}
            setOtp={setOtp}
            handleVerify={handleVerify}
            loading={loading}
            errors={errors}
            setOtpModal={setOtpModal}
            email={data.email}
          />
        ) : (
          <form
            className="flex flex-col gap-4 px-4 mt-6 w-full max-w-[400px] mx-auto"
            onSubmit={handleSubmit}
          >
            {Object.keys(data).map((field) => (
              <InputField
                key={field}
                id={field}
                label={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
                value={data[field]}
                onChange={handleChange}
                error={errors[field]}
              />
            ))}
            <PrimaryButton
              type="submit"
              loading={loading}
              loadingText="Creating..."
              disabled={loading || !isFormValid}
            >
              Sign Up
            </PrimaryButton>
            {errors.apimsg && <ErrorMessage message={errors.apimsg} />}
          </form>
        )}
        <div className="text-center flex flex-row items-center justify-center mt-12">
          <Typography variant="paragraph" className="text-text/70 font-primary">
            Already have an account?
            <Link
              to={RouterData.auth.login}
              className="text-primary font-primary underline ml-1 hover:text-primary"
              aria-label="Sign in"
            >
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
      <SuccessModal
        open={successModal}
        handleOpen={() => setSuccessModal(false)}
        navigate={navigate}
      />
    </div>
  );
};

const OTPVerificationModal = ({
  otp,
  setOtp,
  handleVerify,
  loading,
  errors,
  email,
}) => (
  <div className="flex flex-col justify-center gap-8 relative">
    <div className="flex flex-col items-center justify-center">
      <Typography
        variant="paragraph"
        className="text-text/60 font-primary mt-4 text-center"
      >
        OTP sent to <span className="text-primary underline">{email}</span>
      </Typography>
    </div>
    <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={""}
      inputType="number"
      containerStyle={"flex flex-row gap-4 justify-center rounded-md flex-wrap"}
      inputStyle={
        "!w-10 sm:!w-14 !h-12 bg-black2 text-text text-center rounded-md border border-text/20 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/50 font-primary font-normal text-lg"
      }
      renderInput={(props) => <input {...props} />}
    />
    <PrimaryButton
      onClick={handleVerify}
      loading={loading}
      loadingText="Verifying..."
      disabled={loading}
      className="max-w-max mx-auto"
    >
      Verify Account
    </PrimaryButton>
    {errors.apimsg && <ErrorMessage message={errors.apimsg} />}
  </div>
);

const SuccessModal = ({ open, handleOpen, navigate }) => (
  <Dialog open={open} handler={handleOpen} className="bg-white pb-10 relative">
    <div>
      <Lottie animationData={success} loop className="w-[300px] mx-auto" />
      <div className="flex flex-col gap-1 items-center justify-center w-full max-w-[350px] mx-auto text-center">
        <Typography variant="h3" className="text-text font-primary">
          Your Account is Verified!
        </Typography>
        <Typography variant="paragraph" className="text-text/80 font-primary">
          Your account has been verified successfully. Now you can login to your
          account.
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

export default Signup;
