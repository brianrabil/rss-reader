import React, { useRef, useEffect, Fragment } from "react";
import {
  Typography,
  List,
  Drawer,
} from "@mui/material";
import { Article, Source } from "../models";
import { DrawerHandle, ArticleListItem, DrawerHeader } from "@/components";
import { useDrawerResizable, useLayout } from "@/hooks";

interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
  style?: React.CSSProperties;
  onArticleClick?: (article: Article) => void;
  onDrawerWidthResize?: (width: number) => void;
}

export default function ArticlesDrawer({
  source,
  articles,
  onArticleClick,
  onDrawerWidthResize,
}: ArticlesDrawerProps) {
  const { articlesDrawer } = useLayout();
  const drawerRef = useRef(null);
  const {
    width,
    handleOffsetLeft,
    onHandleMouseDown,
    contentShift,
    open,
  } = useDrawerResizable(drawerRef, articlesDrawer);

  const handleArticleClick = (article: Article) =>
    onArticleClick && onArticleClick(article);

  useEffect(() => {
    onDrawerWidthResize && onDrawerWidthResize(width);
  }, [width]);

  return (
    <Fragment>
      <Drawer
        ref={drawerRef}
        variant="persistent"
        anchor="left"
        elevation={5}
        open={open}
        sx={{
          [`& .MuiDrawer-paper`]: {
            left: contentShift,
            width,
          },
        }}
      >
        <DrawerHeader>
          <img
            src={`http://www.google.com/s2/favicons?domain=${source?.url}`}
          />
          <Typography color="textPrimary">{source?.name}</Typography>
        </DrawerHeader>
        <List>
          {(articles || []).map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              onClick={handleArticleClick}
            />
          ))}
        </List>
      </Drawer>
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </Fragment>
  );
}
