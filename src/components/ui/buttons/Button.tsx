import React, {ReactNode} from "react";
import {IconType} from "react-icons";
import {ButtonVariant, variantClassNames} from "./ButtonVariant";

export default function Button({variant = "primary", leftIcon, rightIcon, className, onClick, children}: Props) {
  const variantStyle = variantClassNames(variant);

  return (
    <button className={`flex rounded-md px-4 h-10 font-medium items-center transition-all ${variantStyle} ${className}`} onClick={onClick}>
      {leftIcon && React.createElement(leftIcon, {className: "mr-3"})}
      {children}
      {rightIcon && React.createElement(rightIcon, {className: "ml-3"})}
    </button>
  )
}

type Props = {
  variant?: ButtonVariant,
  children: ReactNode,
  leftIcon?: IconType,
  rightIcon?: IconType,
  className?: string,
  onClick?: any
}