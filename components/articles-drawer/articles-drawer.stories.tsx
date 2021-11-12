import React from 'react';
import { Story, Meta } from '@storybook/react';
import ArticlesDrawer, { ArticlesDrawerProps } from './articles-drawer';
import { generateArticles, generateSources } from '@/utils';
import { LayoutContext, reducer, initialState } from '@/context/layout';

const MOCK_ARTICLES = generateArticles(10);
const MOCK_SOURCE = generateSources(1)[0];

export default {
  component: ArticlesDrawer,
  title: 'Components/ArticlesDrawer',
} as Meta;

const Template: Story<ArticlesDrawerProps> = (args) => {
  const store = React.useReducer(reducer, initialState);
  return (
    <LayoutContext.Provider value={store}>
      <ArticlesDrawer {...args} />
    </LayoutContext.Provider>
  )
}

export const Primary = Template.bind({});

Primary.args = {
  source: MOCK_SOURCE,
  articles: MOCK_ARTICLES,
  elevation: 1,
  isOpen: true,
  width: 300,
  left: 0
};