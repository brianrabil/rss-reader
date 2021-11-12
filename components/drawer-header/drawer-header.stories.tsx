import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Box } from '@mui/material';
import DrawerHeader, { DrawerHeaderProps } from './drawer-header';

export default {
  component: DrawerHeader,
  title: 'Components/DrawerHeader',
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<DrawerHeaderProps> = (args) => {
  return (
    <DrawerHeader {...args} />
  )
}

export const Primary = Template.bind({});

Primary.args = {
  children: 'Drawer Header',
  sx: {
    maxWidth: '320px'
  }
};