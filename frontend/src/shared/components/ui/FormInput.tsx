import React from "react";
import { Typography } from "./Typography";

interface FormInputProps {
  field: any;
  error?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  field,
  error,
  label,
  placeholder,
  type = "text",
  className = "",
  inputClassName = "",
  disabled = false,
}) => (
  <div className={"w-full" + className}>
    {label && (
      <Typography className="text-ui-inputText text-start mb-1 text-sm">
        {label}
      </Typography>
    )}
    <input
      {...field}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={
        "w-full rounded-lg h-10 text-base px-4 py-4 bg-ui-inputBg text-ui-white border border-ui-inputBorder focus:outline-none" +
        (error ? " border-ui-error" : "") +
        (inputClassName ? ` ${inputClassName}` : "")
      }
    />
    {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
  </div>
);
