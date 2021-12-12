import { ReactNode } from "react";
import styled from "@emotion/styled";

export interface MainProps {
  children?: ReactNode;
  left?: number | null;
}

export default function Main({ children, left }: MainProps) {
  return <Wrapper left={left ?? 0}>{children}</Wrapper>;
}

interface WrapperProps {
  left?: number;
}

const Wrapper = styled.div<WrapperProps>`
  overflow: auto;
  position: fixed;
  width: 100%;
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props?.left ?? 0}px);
  height: 100vh;
  bottom: 0;
  top: 0;
  z-index: 1;
  right: 0;
`;
