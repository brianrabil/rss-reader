import { Box, IconButton, Popover } from "@mui/material";
import { setConfiguration, setStyleMenu } from '@store';

import { FormatSize as FormatSizeIcon } from "@mui/icons-material";
import React from "react";
import StyleMenuOption from "./style-menu-option";

export default function StyleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [selected, setSelected] = React.useState<boolean>(false);
  const handleOptionClick = (option: string) => {
    setSelected(option === "selected");
  };

  return (
    <Box>
      <IconButton aria-label="settings" onClick={handleTriggerClick}>
        <FormatSizeIcon color="action" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            position: "relative",
            minWidth: "300px",
            width: "100%",
            maxWidth: "300px",
            height: "100%",
          }}
        >
          <StyleMenuOption
            section="Typography"
            onOptionClick={handleOptionClick}
            options={[]}
          />
        </Box>
      </Popover>
    </Box>
  );
}
