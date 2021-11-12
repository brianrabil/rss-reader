import { CollapseButton } from "@/components";
import { Grid, Box, useTheme, Theme } from "@mui/material";
import { ReactNode, useMemo, useContext } from "react";
import { SxProps } from "@mui/system";
import { LayoutContext, selectTopNav } from "@/context/layout";

export interface DrawerHeaderProps {
  children?: ReactNode;
  sx?: SxProps;
}

export default function DrawerHeader({ children, sx }: DrawerHeaderProps) {
  const [state] = useContext(LayoutContext);
  const { height } = selectTopNav(state);
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
      minHeight: height,
      maxHeight: height,
      height: height,
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: palette?.divider,
      backgroundColor: palette?.background.paper,
      paddingX: spacing(2),
      ...sx
    }),
    [height, palette, sx]
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
