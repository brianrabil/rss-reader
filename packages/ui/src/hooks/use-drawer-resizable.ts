"use client";
import type { RefObject, MouseEvent } from "react";
import { useState, useEffect, useCallback, useRef } from "react";

export function useDrawerResizable(
  ref: RefObject<HTMLElement | null>,
  contentShift?: number,
  drawerWidth?: number
): {
  handleOffsetLeft: number;
  onHandleMouseDown: (evt: MouseEvent<HTMLDivElement>) => void;
  width: number;
} {
  const [handleOffsetLeft, setHandleOffsetLeft] = useState(0);
  const [width, setWidth] = useState(drawerWidth ?? 0);

  const initialWidth = useRef<number | null>(null);

  const getDrawerPaperEl = useCallback(
    () => ref.current?.querySelector(".MuiDrawer-paper"),
    [ref]
  );

  useEffect(() => {
    const drawerPaperEl = getDrawerPaperEl();
    if (drawerPaperEl) {
      const drawerRect = drawerPaperEl.getBoundingClientRect();
      const drawerOffsetLeft = drawerPaperEl.getBoundingClientRect().left;
      const offsetLeft = drawerOffsetLeft + drawerRect.width;
      setHandleOffsetLeft(offsetLeft);
    }
  }, [getDrawerPaperEl, drawerWidth, contentShift]);

  const onMouseMove = (event: globalThis.MouseEvent): void => {
    if (initialWidth.current !== null) {
      const delta = event.clientX - initialWidth.current;
      const nextWidth = width + delta;
      setWidth(nextWidth);
    }
  };

  const onHandleMouseUp = (_evt: globalThis.MouseEvent): void => {
    window.removeEventListener("mouseup", onHandleMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
    document.body.style.userSelect = "";
  };

  const onHandleMouseDown = (evt: MouseEvent<HTMLDivElement>): void => {
    if (typeof window !== "undefined" && evt.clientX) {
      initialWidth.current = evt.clientX;
      document.body.style.userSelect = "none";
      window.addEventListener("mouseup", onHandleMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    }
  };

  return {
    handleOffsetLeft,
    onHandleMouseDown,
    width,
  };
}
