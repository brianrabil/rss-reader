"use client";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { ArticlesDrawer } from "./articles-drawer";
import { SourcesDrawer } from "./sources-drawer";
import { ArticleView } from "./article";

interface LayoutProps {
  readonly children?: React.ReactNode;
}

export function InboxLayout(_props: LayoutProps): JSX.Element {
  const topNavHeight = useRef(64);

  const [sourcesDrawerWidth, setSourcesDrawerWidth] = useState(240);
  const [articlesDrawerWidth, setArticlesDrawerWidth] = useState(340);
  const [contentShift, setContentShift] = useState(0);
  const [sourcesDrawerOpen, setSourcesDrawerOpen] = useState(true);
  const [articlesDrawerOpen, setArticlesDrawerOpen] = useState(true);

  const handleSourceListOpen = (): void => {
    setSourcesDrawerOpen(true);
  };
  const handleSourceListClose = (): void => {
    setSourcesDrawerOpen(false);
  };
  const handleArticleListOpen = (): void => {
    setArticlesDrawerOpen(true);
  };
  const handleArticleListClose = (): void => {
    setArticlesDrawerOpen(false);
  };
  const handleArticlesDrawerWidthChange = (width: number): void => {
    setArticlesDrawerWidth(width);
  };
  const handleSourcesDrawerWidthChange = (width: number): void => {
    setSourcesDrawerWidth(width);
  };

  const getArticleDrawerContentShift = () =>
    sourcesDrawerOpen ? sourcesDrawerWidth : 0;

  useEffect(() => {
    setContentShift(
      (sourcesDrawerOpen ? sourcesDrawerWidth : 0) +
        (articlesDrawerOpen ? articlesDrawerWidth : 0)
    );
  }, [
    sourcesDrawerOpen,
    articlesDrawerOpen,
    sourcesDrawerWidth,
    articlesDrawerWidth,
  ]);

  return (
    <Box>
      <SourcesDrawer
        drawerWidth={sourcesDrawerWidth}
        headerHeight={topNavHeight.current}
        onClose={handleSourceListClose}
        onDrawerWidthResize={handleSourcesDrawerWidthChange}
        onOpen={handleSourceListOpen}
        open={sourcesDrawerOpen}
      />

      <ArticlesDrawer
        contentShift={getArticleDrawerContentShift()}
        drawerWidth={articlesDrawerWidth}
        headerHeight={topNavHeight.current}
        onArticleClick={handleArticleListClose}
        onClose={handleArticleListClose}
        onDrawerWidthResize={handleArticlesDrawerWidthChange}
        onOpen={handleArticleListOpen}
        open={articlesDrawerOpen}
      />

      <main
        style={{
          position: "fixed",
          width: "100%",
          overflowY: "auto",
          maxWidth: `calc(100vw - ${contentShift}px)`,
          height: `calc(100vh - ${topNavHeight.current}px)`,
          bottom: 0,
          top: topNavHeight.current,
          zIndex: 1,
          right: 0,
        }}
      >
        <ArticleView />
      </main>
    </Box>
  );
}
