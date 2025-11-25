import clsx from "clsx";
import * as React from "react";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "navigation";
}

export default function Button({ variant, children, ...rest }: IButtonProps) {
  return (
    <button type="button" {...rest} className={clsx(variant)}>
      {children}
    </button>
  );
}
