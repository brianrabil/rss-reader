import React, { useMemo, useEffect, useState } from "react";
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
  ResizerHandle,
  SourcesTree,
  UserMenu,
  DrawerHeader,
} from "@/components";
import { useDrawerResizable, useMockSourcesTree, useLayout } from "@/hooks";

interface SourcesDrawerProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export default function SourcesDrawer({ onClose, onOpen }: SourcesDrawerProps) {
  const theme = useTheme();
  const sourcesTree = useMockSourcesTree();
  const { sourcesDrawer, setSourcesDrawer, loading } = useLayout();
  const handleResize = useDrawerResizable(sourcesDrawer, setSourcesDrawer);
  const { left, width, open } = sourcesDrawer;

  if (loading || width === undefined || left === undefined) return null;

  return (
    <Drawer
      variant="persistent"
      open={open ?? true}
      anchor="left"
      sx={{
        [`& .MuiDrawer-paper`]: {
          width,
          left,
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
        <Typography
          variant="subtitle2"
          noWrap
          color={theme.palette.text.secondary}
        >
          Sources
        </Typography>
      </Box>
      <SourcesTree sources={sourcesTree} />
      <Divider />
      <UserMenu />
      <ResizerHandle left={width + left} onMouseDown={handleResize} />
    </Drawer>
  );
}
