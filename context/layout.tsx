import {
  DrawerState,
  ELEVATION,
  LayoutAction,
  LayoutState,
  LAYOUT_ACTION,
  MainState,
  TopNavState,
} from "@/models/layout";
import { createContext, Dispatch, useContext, useMemo } from "react";

/* ------------------------------ Initial State ----------------------------- */

export const initialState: LayoutState = {
  topNav: {
    elevation: ELEVATION.TWO,
    height: 64,
  },
  articlesDrawer: {
    isOpen: true,
    width: 400,
    left: 0,
    elevation: ELEVATION.DEFAULT,
  },
  sourcesDrawer: {
    isOpen: true,
    width: 400,
    left: 0,
    elevation: ELEVATION.DEFAULT,
  },
  main: {
    elevation: ELEVATION.DEFAULT,
  },
};

/* --------------------------------- Reducer -------------------------------- */

export function reducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case LAYOUT_ACTION.SET_ARTICLES_DRAWER:
      return {
        ...state,
        articlesDrawer: {
          ...state.articlesDrawer,
          ...action.payload,
        },
      };
    case LAYOUT_ACTION.SET_SOURCES_DRAWER:
      return {
        ...state,
        sourcesDrawer: {
          ...state.sourcesDrawer,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

/* -------------------------------- Selectors ------------------------------- */

export function selectSourcesDrawer(state?: LayoutState): DrawerState {
  return {
    ...initialState.sourcesDrawer,
    ...state?.sourcesDrawer,
    left: 0,
  };
}

export function selectArticlesDrawer(state?: LayoutState): DrawerState {
  const { isOpen, width } = selectSourcesDrawer(state);
  return {
    ...initialState.articlesDrawer,
    ...state?.articlesDrawer,
    left: isOpen ? width : 0,
  };
}

export function selectTopNav(state?: LayoutState): TopNavState {
  return {
    ...initialState.topNav,
    ...state?.topNav,
  };
}

export function selectMain(state?: LayoutState): MainState {
  return {
    ...initialState.main,
    ...state?.main,
  };
}

export function selectTopNavHeight(state?: LayoutState): number {
  const { height } = selectTopNav(state);
  return height;
}

export function selectContentOffset(state?: LayoutState): number {
  const { isOpen, width } = selectArticlesDrawer(state);
  const { left } = selectArticlesDrawer(state);
  return isOpen ? left + width : left;
}

/* --------------------------------- Context -------------------------------- */

export const LayoutContext = createContext<
  [LayoutState, Dispatch<LayoutAction>]
>([initialState, () => {}]);

/* ---------------------------------- Hooks --------------------------------- */

export function useArticleDrawerStore(deps?: Array<keyof LayoutState>) {
  const [store] = useContext(LayoutContext);
  return useMemo(() => 
    selectArticlesDrawer(store), 
    deps ?? [store]
  );
}

export function useTopNavStore(deps?: Array<keyof LayoutState>) {
  const [store] = useContext(LayoutContext);
  return useMemo(() => 
    selectTopNav(store), 
    deps ?? [store]
  );
}