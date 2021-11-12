import { Typography, Divider, Grid, List, ListItem } from "@mui/material";
import React from "react";

const navItems = [
  {
    id: 0,
    label: "Account",
  },
  {
    id: 1,
    label: "Manage Users",
  },
  {
    id: 4,
    label: "Manage Roles",
  },
  {
    id: 5,
    label: "User Interface"
  }
];

export function ListNavigation() {
  return (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.id}>{item.label}</ListItem>
      ))}
    </List>
  );
}

export default function Settings() {
  return (
    <Grid container>
      <Grid item>
        <ListNavigation />
      </Grid>
      <Grid item>
        <Typography>Account</Typography>
        <Typography>Manage Users</Typography>

        <Divider />

        <Typography>Custom Logo</Typography>
        <Typography>Theme</Typography>
        <Typography>Layout</Typography>
        <Typography>Custom CSS</Typography>
        <Typography>Typography</Typography>

        <Divider />

        <Typography>Security</Typography>
        <Typography>Password</Typography>
        <Typography>Manage Devices</Typography>

        <Divider />

        <Typography>Privacy</Typography>
        <Typography>Notifications</Typography>
        <Typography>Telemetry</Typography>
        <Typography>Favicon Providers</Typography>

        <Divider />

        <Typography>Sources</Typography>
        <Typography>Filters</Typography>
      </Grid>
    </Grid>
  );
}
