import { Folder } from "../models";

const MOCK_SOURCES: Folder[] = [
  {
    id: "1",
    name: "Main",
    unreadCount: 0,
  },
  {
    id: "2",
    name: "Technology",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Sports",
    unreadCount: 0
  },
  {
    id: "4",
    name: "Entertainment",
    unreadCount: 0
  }
];

export function useMockFolders() {
  return MOCK_SOURCES;
}