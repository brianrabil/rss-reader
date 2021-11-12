import React from "react";
import { Typography, Drawer } from "@mui/material";
import { Article, DrawerState, Source } from "@/models";
import {
  ResizerHandle,
  DrawerHeader,
  Favicon,
  ArticleList,
} from "@/components";
import { SxProps } from "@mui/system";

export interface ArticlesDrawerProps extends DrawerState {
  source?: Source;
  articles?: Article[];
  headerHeight?: number;
  isLoading?: boolean;
  onArticleClick?: (article: Article) => void;
  onResizerHandleMouseDown?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ArticlesDrawer({
  source,
  articles,
  onArticleClick,
  onResizerHandleMouseDown,
  elevation = 1,
  headerHeight = 48,
  width = 400,
  isOpen = true,
  isLoading,
  left = 0,
}: ArticlesDrawerProps) {
  const drawerSx: SxProps = {
    [`& .MuiDrawer-paper`]: {
      width: width,
      left: left,
      zIndex: elevation,
    },
  };

  const scrollSx: SxProps<{ maxHeight: string; overflowY: string }> = {
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflowY: "scroll",
    ["&.MuiList-root"]: {
      paddingTop: 0,
    },
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      elevation={elevation}
      open={isOpen}
      sx={drawerSx}
    >
      <DrawerHeader>
        <Favicon source={source} />
        <Typography color="textPrimary">{source?.name}</Typography>
      </DrawerHeader>
      <ArticleList
        articles={articles}
        sx={scrollSx}
        onArticleClick={onArticleClick}
      />
      <ResizerHandle
        onMouseDown={onResizerHandleMouseDown}
        left={width + left}
      />
    </Drawer>
  );
}
