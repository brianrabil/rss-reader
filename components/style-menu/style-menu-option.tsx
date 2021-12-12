import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import React from "react";

interface StyleMenuOptionProps {
  section?: string;
  options: Array<{
    id: string;
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
  }>;
  onOptionClick: (id: string) => void;
}

export default function StyleMenuOption({
  section,
  options,
  onOptionClick,
}: StyleMenuOptionProps) {
  return (
    <List
      dense
      subheader={section && (
        <ListSubheader disableSticky>{section}</ListSubheader>
      )}
    >
      {options.map(({ id, primary, secondary }) => (
        <ListItem key={id} onClick={() => onOptionClick(id)}>
          <ListItemText primary={primary} secondary={secondary} />
          <ChevronRightIcon />
        </ListItem>
      ))}
    </List>
  );
}
