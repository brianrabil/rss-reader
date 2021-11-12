import React from "react";
import { Typography, Drawer } from "@mui/material";
import { Article, ComputedDrawerState, Source } from "@/models";
import {
  ResizerHandle,
  DrawerHeader,
  Favicon,
  ArticleList,
} from "@/components";
import { useArticleDrawerLayout } from "@/hooks";

export interface ArticlesDrawerLayoutOverrideProps
  extends Partial<ComputedDrawerState> {}

export interface ArticlesDrawerProps extends ArticlesDrawerLayoutOverrideProps {
  source?: Source;
  articles?: Article[];
}

export default function ArticlesDrawer({
  source,
  articles,
  ...overrides
}: ArticlesDrawerProps) {
  const layout = useArticleDrawerLayout({
    elevation: overrides.elevation,
    open: overrides.open,
    width: overrides.width,
    left: overrides.left,
  } as ArticlesDrawerLayoutOverrideProps);

  const handleArticleClick = (article: Article) => {
    console.log("article clicked", article);
  };

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
