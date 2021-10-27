export interface DrawerState {
  left: number;
  open: boolean;
  width: number;
  resizing: boolean;
}

export interface LayoutState {
  topNavHeight: number;
  contentShift: number;
  sourcesDrawer: DrawerState;
  articlesDrawer: DrawerState;
}

export type DrawerAction = (drawer: Partial<DrawerState>) => void;