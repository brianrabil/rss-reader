import React, { useRef, useMemo, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArticleListItem from "./article-list-item";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Article, Source } from "../models";
import DrawerHandle from "./drawer-handle";
import { useDrawerResizable, useLayout } from "./../hooks";

interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
  contentShift: number;
  style?: React.CSSProperties;
  onArticleClick: (article: Article) => void;
  onOpen: () => void;
  onClose: () => void;
  onDrawerWidthResize: (width: number) => void;
}

export default function ArticlesDrawer({
  source,
  articles,
  contentShift,
  onOpen,
  onClose,
  onArticleClick,
  onDrawerWidthResize
}: ArticlesDrawerProps) {
  const theme = useTheme();
  const { topNavHeight, articlesDrawer } = useLayout();
  const drawerRef = useRef(null);
  const {
    width,
    handleOffsetLeft,
    onHandleMouseDown,
    open
  } = useDrawerResizable(drawerRef, contentShift, articlesDrawer);

  const handleDrawerOpen = () => onOpen();
  const handleDrawerClose = () => onClose();
  const handleArticleClick = (article: Article) => onArticleClick(article);

  const drawerHeaderStyles = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 2),
      height: topNavHeight,
      minHeight: topNavHeight,
      [`& > img`]: {
        maxWidth: 24,
        maxHeight: 24,
        marginRight: theme.spacing(2),
      },
    }),
    [topNavHeight, theme]
  );

  useEffect(() => {
    onDrawerWidthResize(width);
  }, [width]);

  return (
    <React.Fragment>
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
        <Box sx={drawerHeaderStyles}>
          <img
            src={`http://www.google.com/s2/favicons?domain=${source?.url}`}
          />
          <Typography color="textPrimary">{source?.name}</Typography>
        </Box>
        <Divider />
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
      <DrawerHandle 
        left={handleOffsetLeft} 
        onMouseDown={onHandleMouseDown}
      />
    </React.Fragment>
  );
}
