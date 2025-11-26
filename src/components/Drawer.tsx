import { Drawer as DrawerComp, type DrawerProps } from "@mui/material";

export interface IDrawerProps extends DrawerProps {
  onCloseDrawer: () => void;
}

export default function Drawer({
  children,
  onCloseDrawer,
  ...rest
}: IDrawerProps) {
  return (
    <DrawerComp onClose={onCloseDrawer} {...rest}>
      {children}
    </DrawerComp>
  );
}
