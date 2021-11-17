import React, { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StyleMenu from "@/components/style-menu";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareMenu from "@/components/share-menu";
import { DrawerState, NavState } from '@/models';

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
