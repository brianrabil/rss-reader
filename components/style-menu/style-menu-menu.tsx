import {
  Box,
  List,
  ListItem,
  ListItemText,
  Slide,
} from '@mui/material';

import React from 'react';
import { css } from '@emotion/react';

const wrapperStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
`;

export default function StyleMenuMenu() {
  return (
    <Box css={wrapperStyles}>
      <Slide direction="left" in={true}>
        <List>
          <ListItem>
            <ListItemText primary="Helvetica" />
          </ListItem>
        </List>
      </Slide>
    </Box>
  );
}