import React from 'react';
import { Story, Meta } from '@storybook/react';
import DrawerHeader, { DrawerHeaderProps } from './drawer-header';

export default {
  component: DrawerHeader,
  title: 'Base Components/DrawerHeader',
} as Meta;

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