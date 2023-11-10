import Portal from "@mui/material/Portal";
import Box from "@mui/material/Box";
import React from "react";
import { useTheme } from "@mui/material/styles";

interface DrawerHandleProps {
  readonly left?: number;
  readonly onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function DrawerHandle({
  left,
  onMouseDown,
  onMouseUp,
}: DrawerHandleProps): JSX.Element {
  const theme = useTheme();
  return (
    <Portal>
      <Box
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        sx={{
          width: 6,
          top: 0,
          bottom: 0,
          height: "100vh",
          left: (left || 0) - 3,
          position: "fixed",
          zIndex: 9999,
          opacity: 0,
          cursor: "col-resize",
          display: "flex",
          justifyContent: "center",
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
            delay: theme.transitions.duration.shortest,
          }),
          [`&:hover`]: {
            opacity: 1,
          },
        }}
      >
        <Box
          id="drawer-handle"
          sx={{
            width: 2,
            height: "100vh",
            backgroundColor: theme.palette.secondary.main,
          }}
        />
      </Box>
    </Portal>
  );
}
