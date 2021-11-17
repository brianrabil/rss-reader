import {
  DRAWER,
  DrawerState,
  ELEVATION,
  LayoutAction,
  LayoutState,
  LAYOUT_ACTION,
  NavState,
} from "@/models/layout";
import { createContext, Dispatch, useContext, useMemo } from "react";

/* ------------------------------ Initial State ----------------------------- */

export const initialState: LayoutState = {
  nav: {
    elevation: ELEVATION.TWO,
    height: 64,
    width: 80,
  },
  panel: {
    active: DRAWER.ARTICLES,
    isOpen: true,
    width: 400,
    left: 0,
    elevation: ELEVATION.DEFAULT,
  },
};

/* --------------------------------- Reducer -------------------------------- */

export function reducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case LAYOUT_ACTION.SET_NAV:
      return {
        ...state,
        nav: {
          ...state.nav,
          ...action.payload,
        },
      };
    case LAYOUT_ACTION.SET_PANEL:
      return {
        ...state,
        panel: {
          ...state.panel,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

/* -------------------------------- Selectors ------------------------------- */

export function selectNav(state?: LayoutState): NavState {
  return {
    ...initialState.nav,
    ...state?.nav,
  };
}

export function selectPanel(state?: LayoutState): DrawerState {
  return {
    ...initialState.panel,
    ...state?.panel,
  };
}

/* --------------------------------- Context -------------------------------- */

export const LayoutContext = createContext<
  [LayoutState, Dispatch<LayoutAction>]
>([initialState, () => {}]);

/* ---------------------------------- Hooks --------------------------------- */

export function useNavStore(deps?: Array<keyof LayoutState>) {
  const [store] = useContext(LayoutContext);
  return useMemo(() => selectNav(store), deps ?? [store]);
}

export function usePanelStore(deps?: Array<keyof LayoutState>) {
  const [store] = useContext(LayoutContext);
  return useMemo(() => selectPanel(store), deps ?? [store]);
}
