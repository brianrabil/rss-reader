import { ReactNode, useContext } from "react";
import { LayoutContext, selectContentOffset } from "@/context/layout";
import styled from "@emotion/styled";

export interface MainProps {
  children?: ReactNode;
}

export default function Main({ children }: MainProps) {
  const [state] = useContext(LayoutContext);
  const contentOffset = selectContentOffset(state);

  return <Wrapper contentOffset={contentOffset}>{children}</Wrapper>;
}

interface WrapperProps {
  contentOffset?: number;
}

const Wrapper = styled.div<WrapperProps>`
  overflow: auto;
  position: fixed;
  width: 100%;
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props?.contentOffset ?? 0}px);
  height: 100vh;
  bottom: 0;
  top: 0;
  z-index: 1;
  right: 0;
`;
