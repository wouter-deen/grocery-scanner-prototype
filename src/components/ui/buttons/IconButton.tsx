import React from "react";
import {IconType} from "react-icons";
import {ButtonVariant, variantClassNames} from "./ButtonVariant";

export default function IconButton({variant = "primary", icon, className, onClick}: Props) {
  const variantStyle = variantClassNames(variant);

  return (
    <button className={`flex rounded-md h-10 text-xl items-center justify-center aspect-square transition-all ${variantStyle} ${className}`} onClick={onClick}>
      {React.createElement(icon)}
    </button>
  )
}

type Props = {
  variant?: ButtonVariant,
  icon: IconType,
  className?: string,
  onClick?: any
}