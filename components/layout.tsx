import React from "react";
import Box from "@mui/material/Box";
import { LayoutProps } from "@/models/layout";
import { useArticles, useLayout } from "@/hooks";
import { LayoutContext } from "@/context/layout";
import { Main, TopNav, SourcesDrawer, ArticlesDrawer } from "@/components";
import { generateSources } from "@/utils";

export default function Layout({ children }: LayoutProps) {
  const [state, dispatch] = useLayout();
 
  const source = generateSources(1)[0];
  const articles = useArticles({ useMockData: true });
  
  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <Box>
        <TopNav />
        <SourcesDrawer />
        <ArticlesDrawer source={source} articles={articles} />
        <Main>{children}</Main>
      </Box>
    </LayoutContext.Provider>
  );
}
