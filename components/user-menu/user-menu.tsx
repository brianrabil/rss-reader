import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLayout } from "@/hooks";
import { useState } from "react";

export default function UserMenu() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [{ nav }] = useLayout();

  const rowHeight = { height: nav.height };

  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <List>
      <ListItem onClick={toggleIsExpanded} sx={rowHeight}>
        <ListItemIcon>
          <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHbPxllJPbb_A/profile-displayphoto-shrink_200_200/0/1615401435325?e=1635379200&v=beta&t=B8XlNWICMDMmDdWKelQ554k-hHPuRvXUw5dFpwQVitA" />
        </ListItemIcon>
        <ListItemText primary={"Brian Rabil"} />
      </ListItem>
      {isExpanded && (
        <ListItem sx={rowHeight} button>
          <ListItemText primary={"Profile"} />
        </ListItem>
      )}
    </List>
  );
}
