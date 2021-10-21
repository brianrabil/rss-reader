import { CollapseButton } from "@/components";
import { Grid, Box, useTheme, Theme } from "@mui/material";
import { useLayout } from "@/hooks";
import { ReactNode, useMemo } from "react";
import { SxProps } from "@mui/system";

export interface DrawerHeaderProps {
  children?: ReactNode;
}

export default function DrawerHeader({ children }: DrawerHeaderProps) {
  const { topNavHeight } = useLayout();
  const { direction, palette: { divider }, spacing } = useTheme();

  const isOpen = direction === 'ltr';

  const gridStyles: SxProps<Theme> = useMemo(
    () => ({
      minHeight: topNavHeight,
      maxHeight: topNavHeight,
      height: topNavHeight,
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: divider,
      paddingX: spacing(1)
    }),
    [topNavHeight, divider]
  );

  const handleToggleClick = () => {
    // TODO: Implement this
    console.log("HANDLE TOGGLE CLICK");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={gridStyles}
    >
      <Box>{children}</Box>
      <CollapseButton
        isOpen={isOpen}
        onClick={handleToggleClick}
      />
    </Grid>
  );
}
