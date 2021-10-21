
export interface DrawerState {
  open?: boolean;
  width?: number;
}

export interface LayoutState {
  topNavHeight: number;
  contentShift: number;
  sourcesDrawer: DrawerState;
  articlesDrawer: DrawerState;
}