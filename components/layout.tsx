import React from "react";
import Box from "@mui/material/Box";
import { LayoutProps } from "@/models/layout";
import { useLayout } from "@/hooks";
import { LayoutContext } from "@/context/layout";
import { Main, TopNav, SourcesDrawer, ArticlesDrawer } from "@/components";

export default function Layout({ children }: LayoutProps) {
  const [state, dispatch] = useLayout();

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <Box>
        <TopNav />
        <SourcesDrawer />
        <ArticlesDrawer />
        <Main>{children}</Main>
      </Box>
    </LayoutContext.Provider>
  );
}
