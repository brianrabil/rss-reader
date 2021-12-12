import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Article } from "@models";
import { initialState } from "./initialState";

export interface ReaderConfigurationEntry {
  id: string;
  label?: string;
  value?: string;
  section?: "typography";
  type?: "font-select" | "select" | "range-slider";
  options?: {
    id: string;
    label: string;
    value: string;
  }[];
}

export interface ReaderState {
  article: Article | null;
  configuration: {
    fontFamily: ReaderConfigurationEntry;
    fontSize: ReaderConfigurationEntry;
    leading: ReaderConfigurationEntry;
    measure: ReaderConfigurationEntry;
  };
  styleMenu: {
    isOpen: boolean;
    editingOptionId: string | null;
  };
  isLoading: boolean;
  error: string | null;
}

export const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<Article>) => {
      state.article = action.payload;
    },
    setConfiguration: (
      state,
      action: PayloadAction<Partial<ReaderState["configuration"]>>
    ) => {
      state.configuration = Object.assign(state.configuration, action.payload);
    },
    setStyleMenu: (
      state,
      action: PayloadAction<Partial<ReaderState["styleMenu"]>>
    ) => {
      state.styleMenu = Object.assign(state.styleMenu, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setArticle,
  setConfiguration,
  setStyleMenu,
} = readerSlice.actions;

export default readerSlice.reducer;
