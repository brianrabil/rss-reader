export enum LAYOUT_ACTION {
  SET_ARTICLES_DRAWER = 'SET_ARTICLES_DRAWER',
  SET_SOURCES_DRAWER = 'SET_SOURCES_DRAWER',
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
  | { type: LAYOUT_ACTION.SET_ARTICLES_DRAWER, payload: Partial<DrawerState> }
  | { type: LAYOUT_ACTION.SET_SOURCES_DRAWER, payload: Partial<DrawerState> };

export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout state of the Drawers (Articles and Sources)
 */
export interface DrawerState {
  isOpen: boolean;
  width: number;
  left: number;
  elevation: ELEVATION;
}

export interface TopNavState {
  elevation: ELEVATION;
  height: number;
}

/**
 * Layout state of Main component where the content is rendered.
 */
export interface MainState {
  elevation: ELEVATION;
}

export interface LayoutState {
  topNav: TopNavState;
  sourcesDrawer: DrawerState;
  articlesDrawer: DrawerState;
  main: MainState;
}