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
import { useMockArticles, useDrawerResizable } from "./../hooks";

interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
  drawerWidth?: number;
  contentShift: number;
  style?: React.CSSProperties;
  headerHeight: number;
  open: boolean;
  onArticleClick: (article: Article) => void;
  onOpen: () => void;
  onClose: () => void;
  onDrawerWidthResize: (width: number) => void;
}

export default function ArticlesDrawer({
  source,
  articles,
  drawerWidth,
  open,
  contentShift,
  onOpen,
  headerHeight,
  onClose,
  onArticleClick,
  onDrawerWidthResize,
}: ArticlesDrawerProps) {
  const mockArticles = useMockArticles(25);
  const theme = useTheme();
  const drawerRef = useRef(null);
  const { width, handleOffsetLeft, onHandleMouseDown } = useDrawerResizable(
    drawerRef,
    contentShift,
    drawerWidth
  );

  const handleDrawerOpen = () => onOpen();
  const handleDrawerClose = () => onClose();
  const handleArticleClick = (article: Article) => onArticleClick(article);

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
            width: drawerWidth,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 2),
            height: headerHeight,
            minHeight: headerHeight,
            [`& > img`]: {
              maxWidth: 24,
              maxHeight: 24,
              marginRight: theme.spacing(2),
            },
          }}
        >
          <img
            src={`http://www.google.com/s2/favicons?domain=${source?.url}`}
          />
          <Typography color="textPrimary">{source?.name}</Typography>
        </Box>
        <Divider />
        <List>
          {(articles || mockArticles || []).map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              onClick={handleArticleClick}
            />
          ))}
        </List>
      </Drawer>
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </React.Fragment>
  );
}
