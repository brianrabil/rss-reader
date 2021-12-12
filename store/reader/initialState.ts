import {
  FONT_FAMILY_OPTIONS,
  FONT_LEADING_OPTIONS,
  FONT_MEASURE_OPTIONS,
  FONT_SIZE_OPTIONS,
} from "@constants";

import { ReaderState } from "./readerSlice";

export const initialState: ReaderState = {
  article: null,
  configuration: {
    fontSize: {
      id: "font-size",
      label: "Font Size",
      value: "16px",
      type: "range-slider",
      options: FONT_SIZE_OPTIONS,
    },
    fontFamily: {
      id: "font-family",
      label: "Font Family",
      value: "Georgia, serif",
      type: "font-select",
      options: FONT_FAMILY_OPTIONS,
    },
    leading: {
      id: "leading",
      label: "Leading",
      value: "1.5",
      type: "range-slider",
      options: FONT_LEADING_OPTIONS,
    },
    measure: {
      id: "measure",
      label: "Measure",
      value: "1.5",
      type: "range-slider",
      options: FONT_MEASURE_OPTIONS,
    },
  },
  styleMenu: {
    isOpen: false,
    editingOptionId: null,
  },
  isLoading: false,
  error: null,
};
