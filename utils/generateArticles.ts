import { Article } from "../models";

export function generateArticles(count: number): Article[] {
  return Array.from({ length: count }, (d, i: number) => ({
    id: `article-${i}`,
    title: `Article ${i}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    date: "2020-01-01",
    image: "https://source.unsplash.com/random/400x400",
  }));
}
