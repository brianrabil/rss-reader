import faker from 'faker';
import { Article } from "../models";

export function generateArticles(count: number): Article[] {
  return Array.from({ length: count }, (d, i: number) => ({
    id: `article-${i}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    date: faker.date.past(),
    image: faker.image.imageUrl()
  }));
}
