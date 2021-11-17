import React from 'react';
import { Story, Meta } from '@storybook/react';
import ArticleListItem, { ArticleListItemProps } from '@/components/article-list-item';
import { generateArticles } from '@/utils';

const MOCK_ARTICLES = generateArticles(10);

export default {
  component: ArticleListItem,
  title: 'Components/ArticleListItem',
} as Meta;

const Template: Story<ArticleListItemProps> = (args) => {
  return (
    <ArticleListItem {...args} />
  )
}

export const Primary = Template.bind({});

Primary.args = {
  article: MOCK_ARTICLES[0],
};