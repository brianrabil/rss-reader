import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleListItem, { ArticleListItemProps } from './../components/article-list-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Article List Item',
  component: ArticleListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  article: {
    title: 'Article title',
    date: '2020-01-01',
    id: '1',
    author: 'John Doe',
    source: 'https://www.example.com',
   }
} as ArticleListItemProps;

export const Large = Template.bind({});
