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
  const theme = useTheme();
  const { topNavHeight, articlesDrawer } = useLayout();
  const drawerRef = useRef(null);
  const {
    width,
    handleOffsetLeft,
    onHandleMouseDown,
    contentShift,
    open,
  } = useDrawerResizable(drawerRef, articlesDrawer);

  const handleArticleClick = (article: Article) => onArticleClick && onArticleClick(article);

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
    onDrawerWidthResize && onDrawerWidthResize(width);
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
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </React.Fragment>
  );
}
