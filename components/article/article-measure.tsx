import React from 'react';
import { useTheme, Container } from '@mui/material';

interface ArticleMeasureProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const ArticleMeasure: React.VFC<ArticleMeasureProps> = (props) => {
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

export default ArticleMeasure;
