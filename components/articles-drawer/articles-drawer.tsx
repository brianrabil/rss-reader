import React, { Fragment } from "react";
import { Typography, Drawer } from "@mui/material";
import { Article, DRAWER, DrawerState, NavState, Source } from "@/models";
import {
  ResizerHandle,
  DrawerHeader,
  Favicon,
  ArticleList,
} from "@/components";
import { SxProps } from "@mui/system";

export interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
  store?: DrawerState;
  navStore?: NavState;
  onArticleClick?: (article: Article) => void;
  onResizerHandleMouseDown?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ArticlesDrawer({
  source,
  articles,
  onArticleClick,
  onResizerHandleMouseDown,
  store,
  navStore,
}: ArticlesDrawerProps) {
  if (store?.active !== DRAWER.ARTICLES) return <Fragment />;

  const drawerSx: SxProps = {
    [`& .MuiDrawer-paper`]: {
      width: store?.width,
      left: store?.left,
      zIndex: store?.elevation,
    },
  };

  const scrollSx: SxProps<{ maxHeight: string; overflowY: string }> = {
    maxHeight: `calc(100vh - ${navStore?.height}px)`,
    overflowY: "scroll",
    ["&.MuiList-root"]: {
      paddingTop: 0,
    },
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      elevation={store?.elevation}
      open={store?.isOpen}
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
        left={(store?.width ?? 0) + (store?.left ?? 0)}
      />
    </Drawer>
  );
}
