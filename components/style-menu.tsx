import React from 'react';
import { useTheme } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import FormatSizeIcon from "@mui/icons-material/FormatSizeRounded";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";

const FontSelector = () => {
  return (
    <ButtonGroup>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
      <Button>
        <Typography variant="body1">
          Arial
        </Typography>
      </Button>
      <IconButton>
        <ChevronRightIcon />
      </IconButton>
    </ButtonGroup>
  )
}

export default function StyleMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleTriggerClick}>
        <FormatSizeIcon color="action" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography 
          sx={{
            padding: theme.spacing(2),
          }}
        >
          <FontSelector />
        </Typography>
      </Popover>
    </div>
  );
}