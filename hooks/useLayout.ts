import { useQuery } from "@apollo/client";
import { LayoutState } from './../models';
import { GetLayout } from '../graphql/layout';

export function useLayout(): LayoutState {
  const { data: { layout } } = useQuery(GetLayout);

  return {
    topNavHeight: layout?.topNavHeight,
  }
}