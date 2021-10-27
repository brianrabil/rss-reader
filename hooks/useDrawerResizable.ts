import React, { useCallback, useRef } from "react";
import { DrawerState } from "@/models";

export function useDrawerResizable(
  drawer: DrawerState,
  setDrawer: (drawer: Partial<DrawerState>) => void
): (evt: React.MouseEvent<HTMLElement>) => void {
  const initialWidth = useRef<number | null>(null);

  const onMouseMove = (event: MouseEvent) => {
    if (initialWidth.current !== null) {
      const delta = event.clientX - initialWidth.current;
      const nextWidth = drawer.width + delta;
      setDrawer({ width: nextWidth });
    }
  };

  const onTriggerMouseUp = () => {
    window.removeEventListener("mouseup", onTriggerMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
    document.body.style.userSelect = "";
    setDrawer({ resizing: false });
  };

  const onTriggerMouseDown = useCallback((evt: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && evt.clientX) {
      initialWidth.current = evt.clientX;
      document.body.style.userSelect = "none";
      window.addEventListener("mouseup", onTriggerMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      setDrawer({ resizing: true });
    }
  }, []);

  return onTriggerMouseDown;
}
