import React from "react";
import { classNames } from "../utils";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

const Button: React.FC<Props> = ({ variant = "primary", ...props }) => {
  const commonStyles = "rounded px-2 py-1 text-sm font-semibold shadow-sm";

  const buttonClass =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      : "bg-indigo-200 text-indigo-600 hover:bg-indigo-100";

  return (
    <button
      type="button"
      className={classNames(commonStyles, buttonClass)}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
