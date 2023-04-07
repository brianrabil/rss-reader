import React from "react";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StyleMenu from "../style-menu";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareMenu from "../share-menu";

interface ArticleToolbarProps {
  height?: number;
  style?: React.CSSProperties;
  contentShift?: number;
}

const ArticleToolbar: React.FunctionComponent<ArticleToolbarProps> = (props) => {
  const { style, height, contentShift } = props;
  const theme = useTheme();

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        height: `${height}px`,
        boxShadow: "none",
				borderBottom: 'none',
				width: '100%'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
          }}
        >
          <ShareMenu />
          <StyleMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

ArticleToolbar.displayName = "ArticleToolbar";

export default ArticleToolbar;
