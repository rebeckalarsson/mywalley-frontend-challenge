import clsx from "clsx";
import * as React from "react";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "navigation";
}

export default function Button({ variant, children, ...rest }: IButton) {
  return (
    <button type="button" {...rest} className={clsx(variant)}>
      {children}
    </button>
  );
}
