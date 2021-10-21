import React, { useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import DrawerToggleButton from "./collapse-button";
import SourcesTree from "./sources-tree";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DrawerHandle from "./drawer-handle";
import { useDrawerResizable, useMockSourcesTree, useLayout } from "../hooks";
import Avatar from "@mui/material/Avatar";

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
  const { topNavHeight, sourcesDrawer } = useLayout();

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: topNavHeight,
            padding: theme.spacing(0, 1),
            justifyContent: "flex-end",
          }}
        >
          <DrawerToggleButton
            isOpen={theme.direction === "ltr"}
            onClick={handleDrawerClose}
          />
        </Box>
        <Divider />
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
          <Typography variant="subtitle2" noWrap color="GrayText">
            Sources
          </Typography>
        </Box>
        <SourcesTree sources={mockSourcesTree} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHbPxllJPbb_A/profile-displayphoto-shrink_200_200/0/1615401435325?e=1635379200&v=beta&t=B8XlNWICMDMmDdWKelQ554k-hHPuRvXUw5dFpwQVitA" />
            </ListItemIcon>
            <ListItemText primary={"Brian Rabil"} />
          </ListItem>
        </List>
      </Drawer>
      <DrawerHandle left={handleOffsetLeft} onMouseDown={onHandleMouseDown} />
    </React.Fragment>
  );
}
