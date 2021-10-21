import { LayoutState } from "../../models/layout-state";

const defaultState: LayoutState = {
  topNavHeight: 64,
  contentShift: 260,
  sourcesDrawer: {
    open: true,
    width: 260,
  },
  articlesDrawer: {
    open: true,
    width: 260,
  },
};

function getLocalStorageState() {
  if (typeof window !== "undefined") {
    const localStorageLayout = window?.localStorage.getItem("layout");
    return localStorageLayout && JSON.parse(localStorageLayout);
  }
}

export const initialState = (): LayoutState => {
  // Use state in localStorage if it exists
  const localStorageState = getLocalStorageState();
  return localStorageState ?? defaultState;
};
