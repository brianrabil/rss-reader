import { ComputedDrawerState, LayoutAction, LayoutState, LAYOUT_ACTION } from "@/models/layout";
import { createContext, Dispatch } from "react";

export const initialState: LayoutState = {
  articlesDrawer: {
    open: false,
    width: 300,
  },
  sourcesDrawer: {
    open: false,
    width: 300,
  },
  topNavHeight: 64,
};

export function reducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case LAYOUT_ACTION.RESIZE_ARTICLE_DRAWER:
      return {
        ...state,
        articlesDrawer: {
          ...state.articlesDrawer,
          width: action.width,
        },
      };
    case LAYOUT_ACTION.RESIZE_SOURCES_DRAWER:
      return {
        ...state,
        sourcesDrawer: {
          ...state.sourcesDrawer,
          width: action.width,
        },
      };
    default:
      return state;
  }
}

// Selectors

export function selectSourcesDrawer(state?: LayoutState): ComputedDrawerState {
  return {
    ...initialState.sourcesDrawer,
    ...state?.sourcesDrawer,
    left: 0
  }
}

export function selectArticlesDrawer(state?: LayoutState): ComputedDrawerState {  
  const { open, width } = selectSourcesDrawer(state);
  return {
    ...initialState.articlesDrawer,
    ...state?.articlesDrawer,
    left: open ? width : 0,
  }
}

export function selectTopNavHeight(state?: LayoutState): number {
  return state?.topNavHeight ?? initialState.topNavHeight;
}

export function selectContentOffset(state?: LayoutState): number {
  const { open, width } = selectArticlesDrawer(state);
  const { left } = selectArticlesDrawer(state);
  return open ? left + width : left;
}

export const LayoutContext = createContext<[LayoutState, Dispatch<LayoutAction>] | []>([]);
