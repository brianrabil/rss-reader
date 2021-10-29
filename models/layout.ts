export enum LAYOUT_ACTION {
  RESIZE_ARTICLE_DRAWER,
  RESIZE_SOURCES_DRAWER,
}

export type LayoutAction =
  | { type: LAYOUT_ACTION.RESIZE_ARTICLE_DRAWER; width: number }
  | { type: LAYOUT_ACTION.RESIZE_SOURCES_DRAWER; width: number };

export enum DRAWER {
  ARTICLES,
  SOURCES
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface DrawerState {
  open: boolean;
  width: number;
}

export interface ComputedDrawerState extends DrawerState {
  left: number;
}

export interface LayoutState {
  topNavHeight: number;
  sourcesDrawer: DrawerState;
  articlesDrawer: DrawerState;
}