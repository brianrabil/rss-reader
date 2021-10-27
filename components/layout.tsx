import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ArticlesDrawer from "./articles-drawer";
import SourcesDrawer from "./sources-drawer";
import TopNav from "./top-nav";
import { Article as IArticle } from "../models";
import Main from "./main";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const handleArticleClick = (article: IArticle) => {
    console.log("ARTICLE CLOCKED", article);
  };

  return (
    <Box>
      <TopNav />
      <SourcesDrawer />
      <ArticlesDrawer />
      <Main>{children}</Main>
    </Box>
  );
}
