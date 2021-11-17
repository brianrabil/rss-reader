import { CollapseButton } from "@/components";
import { Grid, Box, useTheme, Theme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { SxProps } from "@mui/system";
import { NavState } from "@/models";

export interface DrawerHeaderProps {
  children?: ReactNode;
  store?: NavState;
  sx?: SxProps;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
  const {
    children,
    store,
    sx
  } = props;
  const {
    direction,
    palette,
    spacing,
  } = useTheme();

  const isOpen = direction === "ltr";

  const handleToggleClick = () => {
    // TODO: Implement this
    console.log("HANDLE TOGGLE CLICK");
  };

  const gridSx: SxProps<Theme> = useMemo(
    () => ({
      minHeight: store?.height,
      maxHeight: store?.height,
      height: store?.height,
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: palette?.divider,
      backgroundColor: palette?.background.paper,
      paddingX: spacing(2),
      ...sx
    }),
    [store, palette, sx]
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={gridSx}
    >
      <Box>{children}</Box>
      <CollapseButton isOpen={isOpen} onClick={handleToggleClick} />
    </Grid>
  );
}
