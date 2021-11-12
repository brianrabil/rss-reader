import {
  LayoutContext,
  selectArticlesDrawer,
  selectTopNav,
} from "@/context/layout";
import { ComputedDrawerState, DRAWER } from "@/models";
import { SxProps } from "@mui/system";
import { useContext } from "react";
import { useDrawerResizable } from "./useDrawerResizable";

function sxAdaptor(state: Partial<ComputedDrawerState>) {
  return {
    [`& .MuiDrawer-paper`]: {
      width: state.width,
      left: state.left,
      zIndex: state.elevation,
    },
  };
}

function handleLeft(state: Partial<ComputedDrawerState>) {
  const left = state?.left ?? 0;
  const width = state?.width ?? 0;
  return left + width;
}

export function useArticleDrawerLayout() {
  const [state] = useContext(LayoutContext);
  const { open, ...ds } = selectArticlesDrawer(state);
  const { height } = selectTopNav(state);
  const handleResize = useDrawerResizable(DRAWER.ARTICLES);

  const scrollSx: SxProps<{ maxHeight: string; overflowY: string }> = {
    maxHeight: `calc(100vh - ${height ?? 0}px)`,
    overflowY: "scroll",
    ['&.MuiList-root']: {
      paddingTop: 0,
    }
  };

  return {
    resizerHandleLeft: handleLeft(ds),
    handleResize,
    open,
    sx: sxAdaptor(ds),
    elevation: ds.elevation,
    scrollSx,
  };
}
