import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { LayoutState, DrawerState, DrawerAction } from "@/models";
import { GetLayout, layoutVar, saveLayout } from "@/graphql/layout";
import { computeContentShift } from "@/utils";

interface LayoutHookResult extends LayoutState {
  loading: boolean;
  setArticlesDrawer: DrawerAction;
  setSourcesDrawer: DrawerAction;
}

export function useLayout(): LayoutHookResult {
  const { data: { layout }, loading } = useQuery(GetLayout);

  const setArticlesDrawer: DrawerAction = useCallback((drawer) => {
    const nextDrawerState: DrawerState = {
      ...layout.articlesDrawer,
      ...drawer
    };

    console.log('NEXT STATe', drawer);

    layoutVar({
      ...layout,
      articlesDrawer: nextDrawerState,
      contentShift: computeContentShift([
        nextDrawerState,
        layout.sourcesDrawer,
      ])
    });

    saveLayout();
  }, []);

  const setSourcesDrawer: DrawerAction = useCallback((drawer) => {
    const nextDrawerState: DrawerState = {
      ...layout.sourcesDrawer,
      ...drawer
    };

    layoutVar({
      ...layout!,
      sourcesDrawer: nextDrawerState,
      articlesDrawer: {
        ...layout.articlesDrawer,
        left: nextDrawerState.left + nextDrawerState.width
      },
      contentShift: computeContentShift([
        nextDrawerState,
        layout.articlesDrawer,
      ])
    });

    saveLayout();
  }, []);

  console.log('USE LAYOUT', layout);

  return {
    ...layout,
    loading: loading ?? true,
    setArticlesDrawer,
    setSourcesDrawer,
  };
}
