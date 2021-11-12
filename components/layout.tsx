import React from "react";
import Box from "@mui/material/Box";
import { DRAWER, LayoutProps } from "@/models/layout";
import { useArticles, useDrawerResizable, useLayout } from "@/hooks";
import { LayoutContext, useArticleDrawerStore, useTopNavStore } from "@/context/layout";
import { Main, TopNav, SourcesDrawer, ArticlesDrawer } from "@/components";
import { generateSources } from "@/utils";

export default function Layout({ children }: LayoutProps) {
  const [state, dispatch] = useLayout();
  const articleDrawer = useArticleDrawerStore();
  const source = generateSources(1)[0];
  const articles = useArticles({ useMockData: true });
  const { height: headerHeight } = useTopNavStore();

  const handleArticlesDrawerResize = useDrawerResizable(DRAWER.ARTICLES);

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <Box>
        <TopNav />
        <SourcesDrawer />
        <ArticlesDrawer 
          source={source} 
          articles={articles} 
          left={articleDrawer.left}
          onResizerHandleMouseDown={handleArticlesDrawerResize}
          width={articleDrawer.width}
          elevation={articleDrawer.elevation}
          isOpen={articleDrawer.isOpen}
        />
        <Main>{children}</Main>
      </Box>
    </LayoutContext.Provider>
  );
}
