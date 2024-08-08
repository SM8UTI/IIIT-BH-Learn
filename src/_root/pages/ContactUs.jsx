/* eslint-disable react/prop-types */
import { useState } from "react";
import Wrapper from "../layouts/Wrapper";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [data, setData] = useState({
    subject: "[Contact Us] IIIT-Bh Learn",
    recipient: "me@swoyam.in",
    message: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    apiMsg: "",
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Clear the error for this field as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

    // Validate fields as the user types
    switch (id) {
      case "name":
        if (value.length < 2) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Name must be at least 2 characters long",
          }));
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Please enter a valid email address",
          }));
        }
        break;
      case "message":
        if (value.length < 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            message: "Message must be at least 10 characters long",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ apiMsg: "", name: "", email: "", message: "" });

    // Validate all fields before submission
    let hasErrors = false;
    if (data.name.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must be at least 2 characters long",
      }));
      hasErrors = true;
    }
    if (!validateEmail(data.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      hasErrors = true;
    }
    if (data.message.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Message must be at least 10 characters long",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    setLoading(true);

    try {
      const response = await fetch("https://contact.swoyam.in/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send message");
      }

      // Reset form after successful submission
      setData({
        subject: "[Contact Us] IIIT-Bh Learn",
        recipient: "me@swoyam.in",
        message: "",
        name: "",
        email: "",
      });
      toast.success("Message sent successfully!", {
        duration: 5000,
        position: "top-center",
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiMsg: error.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="w-full h-full bg-darkPrimary text-white">
        <Wrapper>
          <div className="min-h-[250px] flex flex-col items-center justify-center py-8">
            <h1 className="text-5xl font-medium text-center font-primary">
              Contact <span className="italic font-bold">US</span>
            </h1>
            <p className="w-full max-w-[500px] mx-auto mt-4 text-center">
              We are here to help you. Feel free to contact us for any queries.
            </p>
          </div>
        </Wrapper>
      </div>
      <div>
        <Wrapper>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-[400px] mx-auto mt-8"
          >
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Enter Full name"
              value={data.name}
              onChange={handleChange}
              required
              error={errors.name}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            <InputField
              id="message"
              label="Message"
              type="textarea"
              placeholder="Enter your message"
              value={data.message}
              onChange={handleChange}
              required
              error={errors.message}
            />
            <PrimaryButton
              type="submit"
              loadingText="Sending..."
              loading={loading}
              disabled={
                loading || Object.values(errors).some((error) => error !== "")
              }
              className="w-full"
            >
              Submit
            </PrimaryButton>
            {errors.apiMsg && <ErrorMessage message={errors.apiMsg} />}
          </form>
        </Wrapper>
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

export default ContactUs;
