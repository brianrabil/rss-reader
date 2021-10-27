import React from "react";
import { Typography, Drawer } from "@mui/material";
import { Article, Source } from "../models";
import { ResizerHandle, DrawerHeader, Favicon } from "@/components";
import { useDrawerResizable, useLayout } from "@/hooks";

interface ArticlesDrawerProps {
  source?: Source;
  articles?: Article[];
}

export default function ArticlesDrawer({
  source,
  articles,
}: ArticlesDrawerProps) {
  const { articlesDrawer, setArticlesDrawer, loading } = useLayout();
  const handleResize = useDrawerResizable(articlesDrawer, setArticlesDrawer);
  const { left, width, open } = articlesDrawer;

  const handleArticleClick = (article: Article) => {
    console.log("Handle Articles");
  };

  if (loading) return null;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      elevation={5}
      open={open}
      sx={{
        [`& .MuiDrawer-paper`]: {
          left,
          width,
        },
      }}
    >
      <DrawerHeader>
        <Favicon source={source} />
        <Typography color="textPrimary">{source?.name}</Typography>
      </DrawerHeader>

      <ResizerHandle onMouseDown={handleResize} left={left + width} />
    </Drawer>
  );
}
