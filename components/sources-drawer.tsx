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
import { LayoutContext, selectSourcesDrawer } from "@/context/layout";
import { DRAWER } from "@/models";

interface SourcesDrawerProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export default function SourcesDrawer({ onClose, onOpen }: SourcesDrawerProps) {
  const theme = useTheme();
  const [state] = useContext(LayoutContext);
  const { open, ...sx } = selectSourcesDrawer(state);
  const handleResize = useDrawerResizable(DRAWER.SOURCES);

  const sourcesTree = useMockSourcesTree();

  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="left"
      sx={{ [`& .MuiDrawer-paper`]: sx }}
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
      <ResizerHandle left={sx.width + sx.left} onMouseDown={handleResize} />
    </Drawer>
  );
}
