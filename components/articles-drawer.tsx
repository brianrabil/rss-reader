import React from "react";
import { Typography, Drawer } from "@mui/material";
import { Article, Source } from "@/models";
import {
  ResizerHandle,
  DrawerHeader,
  Favicon,
  ArticleList,
} from "@/components";
import { useArticleDrawerLayout, useArticles } from "@/hooks";

interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
}

export default function ArticlesDrawer({ source }: ArticlesDrawerProps) {
  const layout = useArticleDrawerLayout();
  const articles = useArticles({ useMockData: true });

  const handleArticleClick = (article: Article) => {};

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      elevation={layout.elevation}
      open={layout.open}
      sx={layout.sx}
    >
      <DrawerHeader>
        <Favicon source={source} />
        <Typography color="textPrimary">{source?.name}</Typography>
      </DrawerHeader>
      <ArticleList 
        articles={articles} 
        sx={layout.scrollSx}
        onArticleClick={handleArticleClick} 
      />
      <ResizerHandle
        onMouseDown={layout.handleResize}
        left={layout.resizerHandleLeft}
      />
    </Drawer>
  );
}
