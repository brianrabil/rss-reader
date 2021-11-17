export enum LAYOUT_ACTION {
  SET_PANEL,
  SET_NAV,
}

export enum ELEVATION {
  DEFAULT,
  ONE,
  TWO,
  THREE,
}

export enum DRAWER {
  ARTICLES,
  SOURCES
}

export type LayoutAction =
  | { type: LAYOUT_ACTION.SET_PANEL, payload: Partial<DrawerState> }
  | { type: LAYOUT_ACTION.SET_NAV, payload: Partial<NavState> };

export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout state of the Drawers (Articles and Sources)
 */
export interface DrawerState {
  isOpen?: boolean;
  width?: number;
  left?: number;
  elevation?: ELEVATION;
  active?: DRAWER | null;
}

export interface NavState {
  elevation?: ELEVATION;
  height?: number;
  width?: number;
}

/**
 * Layout state of Main component where the content is rendered.
 */
export interface MainState {
  elevation: ELEVATION;
}

export interface LayoutState {
  nav: NavState;
  panel: DrawerState; 
}