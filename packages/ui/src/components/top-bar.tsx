import React from "react";

export interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return <div>{children}</div>;
}
