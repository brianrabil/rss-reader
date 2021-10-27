import { layoutVar } from "./layoutVar";

export function saveLayout() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("layout", JSON.stringify(layoutVar()));
  }
}
