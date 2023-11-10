import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiStack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { StyleMenu } from "./style-menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ShareMenu } from "./share-menu";

interface ArticleToolbarProps {
  height?: number;
  style?: React.CSSProperties;
}

export function Toolbar(props: ArticleToolbarProps) {
  const { style, height } = props;
  const theme = useTheme();

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

  return (
    <AppBar
      position="relative"
      color="transparent"
      sx={{
        height: `${height}px`,
        boxShadow: "none",
        borderBottom: "none",
        width: "100%",
      }}
    >
      <MuiToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <ArrowBackIcon />
        </IconButton>
        <MuiStack marginLeft="auto" direction="row" gap={theme.spacing(1)}>
          <ShareMenu />
          <StyleMenu />
        </MuiStack>
      </MuiToolbar>
    </AppBar>
  );
}
