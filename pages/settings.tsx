import { Typography, Divider, Grid } from "@mui/material";

export default function Settings() {
  return (
    <Grid container direction="column">
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

  )
}