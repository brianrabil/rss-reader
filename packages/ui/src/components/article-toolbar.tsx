import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyleMenu } from "./style-menu";
import { ShareMenu } from "./share-menu";

interface ArticleToolbarProps {
  height?: number;
  style?: React.CSSProperties;
  contentShift?: number;
}

export const ArticleToolbar: React.FunctionComponent<ArticleToolbarProps> = (
  props
) => {
  const { height } = props;
  const theme = useTheme();

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{
        height: `${height}px`,
        boxShadow: "none",
        borderBottom: "none",
        width: "100%",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          color="inherit"
          edge="start"
          onClick={handleDrawerOpen}
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
