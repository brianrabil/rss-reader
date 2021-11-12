import { ComputedDrawerState, ELEVATION, LayoutAction, LayoutState, LAYOUT_ACTION, MainState, TopNavState } from "@/models/layout";
import { createContext, Dispatch } from "react";

export const initialState: LayoutState = {
  topNav: {
    elevation: ELEVATION.TWO,
    height: 64
  },
  articlesDrawer: {
    open: true,
    width: 420,
    elevation: ELEVATION.DEFAULT
  },
  sourcesDrawer: {
    open: true,
    width: 300,
    elevation: ELEVATION.DEFAULT,
  },
  main: {
    elevation: ELEVATION.DEFAULT
  }
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

export function selectTopNav(state?: LayoutState): TopNavState {
  return {
    ...initialState.topNav,
    ...state?.topNav,
  }
};

export function selectMain(state?: LayoutState): MainState {
  return {
    ...initialState.main,
    ...state?.main
  }
}

export function selectTopNavHeight(state?: LayoutState): number {
  const { height } = selectTopNav(state);
  return height;
}

export function selectContentOffset(state?: LayoutState): number {
  const { open, width } = selectArticlesDrawer(state);
  const { left } = selectArticlesDrawer(state);
  return open ? left + width : left;
}

export const LayoutContext = createContext<[LayoutState, Dispatch<LayoutAction>] | []>([]);
