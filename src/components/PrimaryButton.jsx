/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

const PrimaryButton = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  children,
  className = "",
  ...props
}) => {
  const baseClassName =
    "font-primary capitalize text-base font-semibold bg-secondary text-text rounded-full BoxShadow shadow-none hover:shadow-none";

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClassName} ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default PrimaryButton;
