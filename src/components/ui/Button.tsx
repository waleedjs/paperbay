import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "accent" | "success" | "error"; // Different button variants
  size?: "sm" | "md" | "lg"; // Different sizes for the button
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary", // Default variant
  size = "md", // Default size
  children,
  onClick,
  disabled = false,
}) => {
  // Base styles for the button
  const baseStyle = `font-normal font-body rounded-md focus:outline-none transition-all`;

  // Variant styles
  const variants = {
    primary: "bg-primary text-white hover:bg-red-600",
    secondary: "bg-secondary text-white hover:bg-gray-800 ",
    accent: "bg-accent text-white hover:bg-green-700",
    success: "bg-success text-white hover:bg-green-600 ",
    error: "bg-red-500 text-white hover:bg-red-600",
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1 text-sm", // Small size
    md: "px-4 py-2 text-base", // Medium size (default)
    lg: "px-6 py-3 text-lg", // Large size
  };

  // Disabled styles
  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled ? disabledStyle : ""}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
