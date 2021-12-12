import { DrawerState, NavState } from '@/models';

import AppBar from "@mui/material/AppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React from 'react';
import ShareMenu from "@/components/share-menu/share-menu";
import StyleMenu from "@/components/style-menu/style-menu";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

export interface TopNavProps {
  store?: NavState;
  panelStore?: DrawerState;
}

export default function TopNav({ store, panelStore }: TopNavProps) {
  const theme = useTheme();

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

  const left = (
     (panelStore?.width ?? 0) +
     (panelStore?.left ?? 0)
  )

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        height: store?.height,
        boxShadow: "none",
        zIndex: store?.elevation,
        width: `calc(100vw - ${left}px)`,
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
