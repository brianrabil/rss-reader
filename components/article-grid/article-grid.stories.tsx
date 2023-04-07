import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleGrid from "./article-grid";

export default {
  title: "ArticleGrid",
  component: ArticleGrid,
} as ComponentMeta<typeof ArticleGrid>;

const Template: ComponentStory<typeof ArticleGrid> = (args: any) => <ArticleGrid {...args} />;
