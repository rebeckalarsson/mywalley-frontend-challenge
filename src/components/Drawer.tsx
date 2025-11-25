import clsx from "clsx";

export interface IDrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, children }: IDrawerProps) {
  return (
    <div
      className={clsx(isOpen && "open", "drawer")}
      aria-label="drawer content container"
    >
      <div className="drawer-content-container">{children}</div>
    </div>
  );
}
