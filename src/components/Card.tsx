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
      onKeyDown={(e) => (e.key === "Enter" ? onClick : {})}
      className={clsx("card", className)}
    >
      {children}
    </div>
  );
}
