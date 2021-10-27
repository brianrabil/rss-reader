import { DrawerState } from "@/models";

function computeDrawerContentShift(drawer: DrawerState): number {
  const { open, width } = drawer;
  return open ? (width ?? 0) : 0; 
}

export function computeContentShift(drawers: DrawerState[]): number {
  return drawers.reduce((acc, drawer) => {
    return acc + computeDrawerContentShift(drawer);
  }, 0);
}