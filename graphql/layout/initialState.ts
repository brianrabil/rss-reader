import { LayoutState } from "@/models";

export const defaultState: LayoutState = {
  topNavHeight: 64,
  contentShift: 270,
  sourcesDrawer: {
    open: true,
    width: 270,
    resizing: false,
    left: 0
  },
  articlesDrawer: {
    open: true,
    width: 360,
    resizing: false,
    left: 270
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
