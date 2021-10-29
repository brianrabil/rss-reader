import React, { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StyleMenu from "@/components/style-menu";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareMenu from "@/components/share-menu";
import { LayoutContext, selectTopNavHeight, selectContentOffset} from '@/context/layout';

export default function TopNav() {
  const theme = useTheme();
  const [state] = useContext(LayoutContext);
  const topNavHeight = selectTopNavHeight(state);
  const contentOffset = selectContentOffset(state);

  const handleDrawerOpen = () => {};
  const handleDrawerClose = () => {};

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
        width: `calc(100vw - ${contentOffset}px)`,
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
