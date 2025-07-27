import React from "react";
import { Typography } from "@/shared/components/ui/Typography";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const base =
    "px-6 py-2 rounded-full font-medium shadow-card transition-colors duration-200 text-sm md:text-base";
  const variants = {
    primary: "bg-coffee-primary text-ui-white hover:bg-mvst-orange",
    secondary:
      "bg-ui-white text-coffee-primary hover:bg-mvst-orange border border-coffee-primary",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <Typography as="span" className="inherit">
        {children}
      </Typography>
    </button>
  );
};
