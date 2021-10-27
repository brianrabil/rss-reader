import React from 'react';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StyleMenu from "./style-menu";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareMenu from "./share-menu";
import { useLayout } from './../hooks';

export default function TopNav() {
  const theme = useTheme();
  const { topNavHeight, contentShift, loading } = useLayout();

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

  if (loading) return null;

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        height: topNavHeight,
        boxShadow: "none",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.divider,
        width: `calc(100vw - ${contentShift}px)`,
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
}
