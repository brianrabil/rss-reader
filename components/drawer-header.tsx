import { CollapseButton } from "@/components";
import { Grid, Box, useTheme, Theme } from "@mui/material";
import { ReactNode, useMemo, useContext } from "react";
import { SxProps } from "@mui/system";
import { LayoutContext, selectTopNav } from '@/context/layout';
import { LayoutState } from "@/models";
export interface DrawerHeaderProps {
  children?: ReactNode;
}

function useDrawerHeaderSx(state?: LayoutState) {
  const { height } = selectTopNav(state);
  const { direction, palette: { divider }, spacing } = useTheme();

  const isOpen = direction === 'ltr';

  const grid: SxProps<Theme> = useMemo(
    () => ({
      minHeight: height,
      maxHeight: height,
      height: height,
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: divider,
      paddingX: spacing(2)
    }),
    [height, divider]
  );

  return {
    isOpen,
    sx: { grid }
  }
}

export default function DrawerHeader({ children }: DrawerHeaderProps) {
  const [state] = useContext(LayoutContext);
  const { isOpen, sx } = useDrawerHeaderSx(state); 
  
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
      sx={sx.grid}
    >
      <Box>{children}</Box>
      <CollapseButton
        isOpen={isOpen}
        onClick={handleToggleClick}
      />
    </Grid>
  );
}
