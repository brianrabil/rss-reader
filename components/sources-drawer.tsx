import React, { useContext } from "react";
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
import { useDrawerResizable, useMockSourcesTree } from "@/hooks";
import { DRAWER, DrawerState, NavState } from "@/models";

interface SourcesDrawerProps {
  store?: DrawerState;
  navStore?: NavState;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function SourcesDrawer({
  onClose,
  onOpen,
  store,
  navStore,
}: SourcesDrawerProps) {
  const theme = useTheme();

  const handleResize = useDrawerResizable(DRAWER.SOURCES);

  const sourcesTree = useMockSourcesTree();

  return (
    <Drawer
      variant="persistent"
      open={store?.isOpen}
      anchor="left"
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: store?.width,
          left: store?.left,
          zIndex: store?.elevation,
        },
      }}
    >
      <DrawerHeader store={navStore} />
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
      <ResizerHandle
        left={(store?.width ?? 0) + (store?.left ?? 0)}
        onMouseDown={handleResize}
      />
    </Drawer>
  );
}
