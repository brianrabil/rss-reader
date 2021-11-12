import { LAYOUT_ACTION, DRAWER, ComputedDrawerState, LayoutAction } from "@/models/layout";
import {
  LayoutContext,
  selectArticlesDrawer,
  selectSourcesDrawer,
} from "@/context/layout";
import React, { useCallback, useRef, useContext, useEffect } from "react";

export function useDrawerResizable(
  drawerId: DRAWER
): (evt: React.MouseEvent<HTMLElement>) => void {
  const initialWidth = useRef<number | null>(null);
  const [state, dispatch] = useContext(LayoutContext);

  const actionTypes = {
    [DRAWER.ARTICLES]: LAYOUT_ACTION.RESIZE_ARTICLE_DRAWER,
    [DRAWER.SOURCES]: LAYOUT_ACTION.RESIZE_SOURCES_DRAWER,
  };

  function getDrawer(): ComputedDrawerState {
    switch (drawerId) {
      case DRAWER.ARTICLES:
        return selectArticlesDrawer(state);
      case DRAWER.SOURCES:
        return selectSourcesDrawer(state);
    }
  }

  const onMouseMove = (event: MouseEvent) => {
    if (initialWidth.current !== null && dispatch) {
      const drawer = getDrawer();
      const delta = event.clientX - initialWidth.current;
      const nextWidth = drawer?.width + delta;
      dispatch?.({
        type: actionTypes[drawerId],
        width: nextWidth,
      } as LayoutAction);
    }
  };

  const onTriggerMouseUp = () => {
    window.removeEventListener("mouseup", onTriggerMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
    document.body.style.userSelect = "";
  };

  const onTriggerMouseDown = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      if (typeof window !== "undefined" && evt.clientX) {
        initialWidth.current = evt.clientX;
        document.body.style.userSelect = "none";
        window.addEventListener("mouseup", onTriggerMouseUp);
        window.addEventListener("mousemove", onMouseMove);
      }
    },
    []
  );

  useEffect(
    () => () => {
      window.removeEventListener("mouseup", onTriggerMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    },
    []
  );

  return onTriggerMouseDown;
}
