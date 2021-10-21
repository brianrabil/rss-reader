import {
  useState,
  useEffect,
  useCallback,
  RefObject,
  useRef,
  useMemo,
} from "react";
import { DrawerState } from "../models";
import { useLayout } from "./../hooks";

export function useDrawerResizable(
  ref: RefObject<HTMLElement | null>,
  drawer?: DrawerState
) {
  const { sourcesDrawer } = useLayout();
  const [handleOffsetLeft, setHandleOffsetLeft] = useState(0);
  const [width, setWidth] = useState(drawer?.width || 0);

  const initialWidth = useRef<number | null>(null);

  const contentShift = useMemo(
    () => (sourcesDrawer.open ? sourcesDrawer.width : 0),
    [sourcesDrawer]
  );

  const getDrawerPaperEl = useCallback(
    () => ref?.current?.querySelector(".MuiDrawer-paper") as HTMLElement,
    [ref]
  );

  useEffect(() => {
    const drawerPaperEl = getDrawerPaperEl();
    if (drawerPaperEl) {
      const drawerWidth = drawerPaperEl.getBoundingClientRect()?.width;
      const drawerOffsetLeft = drawerPaperEl.getBoundingClientRect()?.left;
      const offsetLeft = drawerOffsetLeft + drawerWidth;
      setHandleOffsetLeft(offsetLeft);
    }
  }, [getDrawerPaperEl, drawer?.width, contentShift]);

  const onMouseMove = (event: MouseEvent) => {
    if (initialWidth.current !== null) {
      const delta = event.clientX - initialWidth.current;
      const nextWidth = width + delta;
      setWidth(nextWidth);
    }
  };

  const onHandleMouseUp = (evt: MouseEvent) => {
    window.removeEventListener("mouseup", onHandleMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
    document.body.style.userSelect = "";
  };

  const onHandleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && evt.clientX) {
      initialWidth.current = evt.clientX;
      document.body.style.userSelect = "none";
      window.addEventListener("mouseup", (evt) => onHandleMouseUp(evt));
      window.addEventListener("mousemove", onMouseMove);
    }
  };

  return {
    handleOffsetLeft,
    onHandleMouseDown,
    width,
    contentShift,
    open: drawer?.open,
  };
}
