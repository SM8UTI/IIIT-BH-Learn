/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import logo from "../../assets/logo.svg";
import RouterData from "../../router/RouterData";
import { API_URL } from "../../utils/constant";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const Signin = () => {
  const [data, setData] = useState({
    usernameOrEmail: "b121065@iiit-bh.ac.in",
    password: "Admin@123",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    apimsg: "",
    usernameOrEmail: "",
  });

  const navigate = useNavigate();

  const validateInput = useCallback((input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@iiit-bh\.ac\.in$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
    return emailRegex.test(input) || usernameRegex.test(input);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));

      if (name === "usernameOrEmail") {
        setErrors((prev) => ({
          ...prev,
          usernameOrEmail: !value
            ? "Username or Email is required"
            : !validateInput(value)
            ? "Enter a valid username or IIIT-BH email"
            : "",
        }));
      }
    },
    [validateInput]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({ apimsg: "", usernameOrEmail: "" });

      if (!data.usernameOrEmail || !data.password) {
        setLoading(false);
        return setErrors((prev) => ({
          ...prev,
          apimsg: "Please fill all fields",
        }));
      }

      if (!validateInput(data.usernameOrEmail)) {
        setLoading(false);
        return setErrors((prev) => ({
          ...prev,
          usernameOrEmail: "Invalid username or email format",
        }));
      }

      try {
        const response = await axios.get(`${API_URL}/users/login`, {
          params: { username: data.usernameOrEmail, password: data.password },
          headers: { accept: "application/json" },
        });

        Cookies.set("token", response.data.token);
        toast.success("Logged in successfully", { duration: 4000 });
        navigate("/");
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apimsg:
            error.response?.data?.message ||
            "Login failed. Please check your credentials and try again.",
        }));
      } finally {
        setLoading(false);
      }
    },
    [data, validateInput, navigate]
  );

  return (
    <div className="p-4 w-full h-dvh overflow-hidden overflow-y-scroll">
      <div className="w-full mt-20">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="IIIT BH Learn"
              className="w-full max-w-[180px]"
            />
          </Link>
          <Typography variant="h2" className="font-primary mt-4">
            Welcome Back!
          </Typography>
          <Typography
            variant="paragraph"
            className="font-primary text-text/70 text-center text-sm max-w-[400px] mt-2"
          >
            Hey there! Ready to log in? Just enter your username or IIIT-BH
            email and password below and you'll be back in action in no time.
            Let's go!
          </Typography>
        </div>
        <form
          className="flex flex-col gap-4 px-4 mt-6 w-full max-w-[400px] mx-auto"
          onSubmit={handleSubmit}
        >
          <InputField
            id="usernameOrEmail"
            label="Username or IIIT-BH Email"
            type="text"
            placeholder="Enter your username or IIIT-BH email"
            value={data.usernameOrEmail}
            onChange={handleChange}
            error={errors.usernameOrEmail}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            value={data.password}
            onChange={handleChange}
          />
          <div className="text-sm text-primary underline flex flex-row justify-end">
            <Link to={RouterData.auth.forgotPassword}>Forgot Password?</Link>
          </div>
          <PrimaryButton
            type="submit"
            loading={loading}
            loadingText="Signing in..."
            disabled={loading || errors.usernameOrEmail !== ""}
          >
            Sign in
          </PrimaryButton>
          {errors.apimsg && <ErrorMessage message={errors.apimsg} />}
        </form>
        <div className="text-center flex flex-row items-center justify-center mt-12">
          <Typography variant="paragraph" className="text-text/70 font-primary">
            Don't have an account?
            <Link
              to={RouterData.auth.signup}
              className="text-primary font-primary underline ml-1 hover:text-primary"
              aria-label="Sign up"
            >
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

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

export default Signin;
