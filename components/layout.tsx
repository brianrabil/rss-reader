import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import ArticlesDrawer from "./articles-drawer";
import SourcesDrawer from "./sources-drawer";
import TopNav from "./top-nav";
import Article from './article';
import { Article as IArticle } from "../models";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const theme = useTheme();

  const topNavHeight = useRef(64);

  const [sourcesDrawerWidth, setSourcesDrawerWidth] = useState(240);
  const [articlesDrawerWidth, setArticlesDrawerWidth] = useState(340);
  const [contentShift, setContentShift] = useState(0);
  const [sourcesDrawerOpen, setSourcesDrawerOpen] = useState(true);
  const [articlesDrawerOpen, setArticlesDrawerOpen] = useState(true);

  const handleSourceListOpen = () => setSourcesDrawerOpen(true);
  const handleSourceListClose = () => setSourcesDrawerOpen(false);
  const handleArticleListOpen = () => setArticlesDrawerOpen(true);
  const handleArticleListClose = () => setArticlesDrawerOpen(false);
  const handleArticlesDrawerWidthChange = (width: number) => setArticlesDrawerWidth(width);
  const handleSourcesDrawerWidthChange = (width: number) => setSourcesDrawerWidth(width);
  const handleArticleClick = (article: IArticle) => {
    console.log('ARTICLE CLOCKED', article);
  }

  const getArticleDrawerContentShift = () => (sourcesDrawerOpen) ? sourcesDrawerWidth : 0;

  useEffect(() => {
    setContentShift(
      (((sourcesDrawerOpen) ? sourcesDrawerWidth : 0) +
      ((articlesDrawerOpen) ? articlesDrawerWidth : 0))
    )
  }, [sourcesDrawerOpen, articlesDrawerOpen, sourcesDrawerWidth, articlesDrawerWidth]);

  return (
    <Box>
      <TopNav 
        contentShift={contentShift}
      />

      <SourcesDrawer 
        headerHeight={topNavHeight.current}
        drawerWidth={sourcesDrawerWidth}
        onClose={handleSourceListClose}
        onOpen={handleSourceListOpen}
        open={sourcesDrawerOpen}
        onDrawerWidthResize={handleSourcesDrawerWidthChange}
      />

      <ArticlesDrawer 
        headerHeight={topNavHeight.current}
        drawerWidth={articlesDrawerWidth}
        onClose={handleArticleListClose}
        onOpen={handleArticleListOpen}
        contentShift={getArticleDrawerContentShift()}
        open={articlesDrawerOpen}
        onArticleClick={handleArticleListClose}
        onDrawerWidthResize={handleArticlesDrawerWidthChange}
      />

      <main
        style={{
          position: "fixed",
          width: "100%",
          overflowY: "auto",
          maxWidth: `calc(100vw - ${contentShift}px)`,
          height: `calc(100vh - ${topNavHeight}px)`,
          bottom: 0,
          top: topNavHeight.current,
          zIndex: 1,
          right: 0,
        }}
      >
        <Article />
      </main>
    </Box>
  );
}
