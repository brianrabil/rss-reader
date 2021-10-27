import { RefObject } from "react";

export function getPaperRootEl(ref: RefObject<HTMLElement>): HTMLDivElement | null {
  const el = ref?.current;
  const innerEl = el?.querySelector<HTMLDivElement>(".MuiPaper-root");
  return innerEl ?? null;
}