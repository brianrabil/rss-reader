import {} from "react";
import { Source } from "../models";

const MOCK_SOURCES: Source[] = [
  {
    id: "123",
    name: "The Wallstreet Journal",
    folderId: "1",
    unread: 10,
    url: "https://www.wsj.com/",
    favicon: "https://www.wsj.com/favicon.ico",
  },
  {
    id: "2345",
    name: "The Guardian",
    folderId: "1",
    unread: 0,
    url: "https://www.theguardian.com/",
    favicon: "https://www.theguardian.com/favicon.ico",
  },
  {
    id: "3453",
    name: "The New York Times",
    folderId: "1",
    unread: 0,
    url: "https://www.nytimes.com/",
    favicon: "https://www.nytimes.com/favicon.ico",
  },

  {
    id: "12342345",
    name: "HackerNews",
    folderId: "2",
    unread: 10,
    url: "https://news.ycombinator.com/",
    favicon: "https://news.ycombinator.com/favicon.ico",
  },
  {
    id: "2345y62356",
    name: "Reddit",
    folderId: "2",
    unread: 0,
    url: "https://www.reddit.com/",
    favicon: "https://www.reddit.com/favicon.ico",
  },
  {
    id: "2356jlksdf",
    name: "The Verge",
    folderId: "2",
    unread: 0,
    url: "https://www.theverge.com/",
    favicon: "https://www.theverge.com/favicon.ico",
  },
  {
    id: "234652345lkj",
    name: "TechCrunch",
    folderId: "2",
    unread: 0,
    url: "https://techcrunch.com/",
    favicon: "https://techcrunch.com/favicon.ico",
  },
  {
    id: "2ui34kllkhjlkj",
    name: "The Next Web",
    folderId: "2",
    unread: 0,
    url: "https://thenextweb.com/",
    favicon: "https://thenextweb.com/favicon.ico",
  },
  {
    id: "12342345",
    name: "ESPN",
    folderId: "3",
    unread: 10,
    url: "https://www.espn.com/",
    favicon: "https://www.espn.com/favicon.ico",
  },
  {
    id: "2345y62356",
    name: "The Sports Post",
    folderId: "3",
    unread: 0,
    url: "https://www.thesportspost.com/",
    favicon: "https://www.thesportspost.com/favicon.ico",
  },
  {
    id: "12342345",
    name: "MTV",
    folderId: "4",
    unread: 10,
    url: "https://www.mtv.com/",
    favicon: "https://www.mtv.com/favicon.ico",
  },
  {
    id: "2345y62356",
    name: "The New York Times",
    folderId: "4",
    unread: 0,
    url: "https://www.nytimes.com/",
    favicon: "https://www.nytimes.com/favicon.ico",
  },
];

export function useMockSources() {
  return MOCK_SOURCES;
}
