import clsx from "clsx";

export interface ICardProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CardItem({ onClick, children, className }: ICardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={clsx("card", className)}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : "listbox"}
    >
      {children}
    </div>
  );
}
