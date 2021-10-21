import { ReactNode, useMemo, CSSProperties } from "react";
import { useLayout } from "./../hooks";

export interface MainProps {
  children?: ReactNode;
}

export default function Main({ children }: MainProps) {
  const { topNavHeight, contentShift } = useLayout();

  const mainStyles: CSSProperties = useMemo(
    () => ({
      position: "fixed",
      width: "100%",
      overflowY: "auto",
      maxWidth: `calc(100vw - ${contentShift}px)`,
      height: `calc(100vh - ${topNavHeight}px)`,
      bottom: 0,
      top: topNavHeight,
      zIndex: 1,
      right: 0,
    }),
    [topNavHeight, contentShift]
  );

  return <main style={mainStyles}>{children}</main>;
}
