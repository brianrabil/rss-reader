import React, { Dispatch, useReducer } from "react";
import { DRAWER, DrawerState } from "@/models";
import SourcesDrawer from "@/components/sources-drawer";
import ArticlesDrawer from "@/components/articles-drawer";
import { Box } from "@mui/material";
import { usePanelStore } from "@/context/layout";

interface SidebarPanelState {
  activePanelId: string | null;
  panel: DrawerState;
}

const initialState: SidebarPanelState = {
  activePanelId: 'sources',
  panel: {
    width: 400,
    left: 80,
    elevation: 1,
    isOpen: true,
  },
};

type ActionType = { type: "setActivePanel"; payload: string | null };

function reducer(state: SidebarPanelState, action: ActionType) {
  switch (action.type) {
    case "setActivePanel":
      return {
        ...state,
        activePanelId: action.payload,
      };
    default:
      return state;
  }
}

export default function Sidebar() {
  const panelStore = usePanelStore();

  return (
    <Box sx={{ height: '100vh' }}>
      <Box>
        <ArticlesDrawer store={panelStore} />
        <SourcesDrawer store={panelStore} />
      </Box>
    </Box>
  );
}

interface DrawerFactoryProps {
  active: DRAWER | null;
  children?: React.ReactNode;
}

