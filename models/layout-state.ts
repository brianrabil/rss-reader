
export interface DrawerState {
  open?: boolean;
  width?: number;
}

export interface LayoutState {
  topNavHeight: number;
  sourcesDrawer: DrawerState;
  articlesDrawer: DrawerState;
}