import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';

export default function ShareMenu() {
  const theme = useTheme();
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

  return (
    <Box>
      <IconButton onClick={handleTriggerClick}>
        <ShareIcon />
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
        <Typography
          sx={{
            padding: theme.spacing(2),
          }}
        >
          The content of the Popover.
        </Typography>
      </Popover>
    </Box>
  );
}
