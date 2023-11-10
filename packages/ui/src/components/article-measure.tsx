import * as React from "react";
import { useTheme, Container } from "@mui/material";

interface ArticleMeasureProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ArticleMeasure(props: ArticleMeasureProps) {
  const { children } = props;

  const theme = useTheme();

  return (
    <Container
      sx={{
        paddingY: theme.spacing(9),
        paddingX: theme.spacing(3),
      }}
      maxWidth="md"
    >
      {children}
    </Container>
  );
}
