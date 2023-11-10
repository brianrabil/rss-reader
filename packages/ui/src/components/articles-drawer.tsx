import { useRef, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import type { Article, Source } from "../models";
import { useMockArticles, useDrawerResizable } from "../hooks";
import { ArticleListItem } from "./article-list-item";
import { DrawerHandle } from "./drawer-handle";

interface ArticlesDrawerProps {
  readonly source?: Source;
  readonly articles?: Article[];
  readonly drawerWidth?: number;
  readonly contentShift: number;
  readonly headerHeight: number;
  readonly open: boolean;
  readonly onArticleClick: (article: Article) => void;
  readonly onClose: () => void;
  readonly onOpen: () => void;
  readonly onDrawerWidthResize: (width: number) => void;
}

export function ArticlesDrawer({
  source,
  articles,
  drawerWidth,
  open,
  contentShift,
  headerHeight,
  onArticleClick,
  onClose,
  onOpen,
  onDrawerWidthResize,
}: ArticlesDrawerProps): JSX.Element {
  const mockArticles = useMockArticles(25);
  const theme = useTheme();
  const drawerRef = useRef(null);
  const { width, handleOffsetLeft, onHandleMouseDown } = useDrawerResizable(
    drawerRef,
    contentShift,
    drawerWidth
  );

  const handleArticleClick = (article: Article): void => {
    onArticleClick(article);
  };

  const handleDrawerClose = (): void => {
    onClose();
  };

  const handleDrawerOpen = (): void => {
    onOpen();
  };

  useEffect(() => {
    onDrawerWidthResize(width);
  }, [onDrawerWidthResize, width]);

  return (
    <>
      <Drawer
        anchor="left"
        elevation={5}
        open={open}
        ref={drawerRef}
        sx={{
          [`& .MuiDrawer-paper`]: {
            left: contentShift,
            width: drawerWidth,
          },
        }}
        variant="persistent"
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
            alt="favicon"
            src={`http://www.google.com/s2/favicons?domain=${source?.url}`}
          />
          <Typography color="textPrimary">{source?.name}</Typography>
        </Box>
        <Divider />
        <List>
          {(articles ?? mockArticles).map((article) => (
            <ArticleListItem
              article={article}
              key={article.id}
              onClick={handleArticleClick}
            />
          ))}
        </List>
      </Drawer>
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </>
  );
}
