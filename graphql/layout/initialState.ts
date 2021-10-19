import { LayoutState } from '../../models/layout-state';

const defaultState: LayoutState = {
  topNavHeight: 64,
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