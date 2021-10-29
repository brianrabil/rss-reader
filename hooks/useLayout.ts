import { useReducer } from "react";
import { initialState, reducer } from '@/context/layout';

export const useLayout = () => useReducer(reducer, initialState);