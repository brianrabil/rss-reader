import { makeVar } from "@apollo/client";
import { initialState } from "./initialState";
import { LayoutState } from "../../models/layout-state";

export const layoutVar = makeVar<LayoutState>(initialState());
