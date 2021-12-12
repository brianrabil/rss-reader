import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { LayoutProps } from "@/models/layout";
import { useArticles } from "@/hooks";
import { Main, TopNav } from "@/components";
import { LayoutContext, useNavStore, usePanelStore } from "@/context/layout";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: LayoutProps) {
  const [state, dispatch] = useContext(LayoutContext);
  const articles = useArticles({ useMockData: true });
  const navStore = useNavStore();
  const panelStore = usePanelStore();

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <Box>
        <TopNav store={navStore} panelStore={panelStore} />
        <Sidebar />
        <Main left={(panelStore?.left ?? 0) + (panelStore?.width ?? 0)}>
          {children}
        </Main>
      </Box>
    </LayoutContext.Provider>
  );
}
