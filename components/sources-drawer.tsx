import React, { useRef, useEffect } from "react";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  List,
  Drawer,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  Stars as StarsIcon,
  AllInbox as AllInboxIcon,
} from "@mui/icons-material";
import {
  DrawerHandle,
  SourcesTree,
  UserMenu,
  DrawerHeader
} from "@/components";
import { useDrawerResizable, useMockSourcesTree, useLayout } from "@/hooks";

interface SourcesDrawerProps {
  onClose?: () => void;
  onDrawerWidthResize?: (width: number) => void;
  onOpen?: () => void;
  style?: React.CSSProperties;
}

export default function SourcesDrawer({
  onClose,
  onDrawerWidthResize,
  onOpen,
  style,
}: SourcesDrawerProps) {
  const drawerRef = useRef(null);
  const theme = useTheme();
  const mockSourcesTree = useMockSourcesTree();
  const { sourcesDrawer } = useLayout();

  const {
    width,
    handleOffsetLeft,
    onHandleMouseDown,
    open,
  } = useDrawerResizable(drawerRef, sourcesDrawer);

  useEffect(() => {
    onDrawerWidthResize && onDrawerWidthResize(width);
  }, [width]);

  const handleDrawerOpen = () => onOpen && onOpen();
  const handleDrawerClose = () => onClose && onClose();

  return (
    <React.Fragment>
      <Drawer
        style={style}
        variant="persistent"
        open={open}
        ref={drawerRef}
        anchor="left"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width,
          },
        }}
      >
        <DrawerHeader />
        <List>
          <ListItem button key="All">
            <ListItemIcon>
              <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary="All Sources" />
          </ListItem>
          <ListItem button key="Starred">
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
        <Divider />
        <Box padding={theme.spacing(2)}>
          <Typography variant="subtitle2" noWrap color={theme.palette.text.secondary}>
            Sources
          </Typography>
        </Box>
        <SourcesTree sources={mockSourcesTree} />
        <Divider />
        <UserMenu />
      </Drawer>
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </React.Fragment>
  );
}
