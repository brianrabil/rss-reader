import React from 'react';
import { Story, Meta } from '@storybook/react';
import ArticlesDrawer, { ArticlesDrawerProps } from './articles-drawer';
import { generateArticles, generateSources } from '@/utils';

const MOCK_ARTICLES = generateArticles(10);
const MOCK_SOURCE = generateSources(1)[0];

export default {
  component: ArticlesDrawer,
  title: 'Components/DrawerHeader',
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ArticlesDrawerProps> = (args) => {
  return (
    <ArticlesDrawer {...args} />
  )
}

export const Primary = Template.bind({});

Primary.args = {
  articles: MOCK_ARTICLES,
  source: MOCK_SOURCE,
  elevation: 2,
  open: true,
  width: 300
};