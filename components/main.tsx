import { ReactNode, useContext } from "react";
import {
  LayoutContext,
  selectContentOffset,
  selectTopNavHeight,
} from "@/context/layout";

export interface MainProps {
  children?: ReactNode;
}

export default function Main({ children }: MainProps) {
  const [state] = useContext(LayoutContext);
  const contentOffset = selectContentOffset(state);
  const topNavHeight = selectTopNavHeight(state);

  return (
    <main
      style={{
        position: "fixed",
        width: "100%",
        overflowY: "auto",
        maxWidth: `calc(100vw - ${contentOffset}px)`,
        height: `calc(100vh - ${topNavHeight}px)`,
        bottom: 0,
        top: topNavHeight,
        zIndex: 1,
        right: 0,
      }}
    >
      {children}
    </main>
  );
}
