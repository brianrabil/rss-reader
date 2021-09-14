import { useMemo } from 'react';
import { Folder, Source } from "../models";
import { useMockFolders } from "./useMockFolders";
import { useMockSources } from "./useMockSources";

const buildTree = (folders: Folder[], sources: Source[]): Folder[] => {
  const tree = folders.map((folder) => {
    const folderSources = sources.filter(
      (source) => source.folderId === folder.id
    );
    return {
      ...folder,
      sources: folderSources,
    };
  });
  return tree;
};

export function useMockSourcesTree() {
  const folders = useMockFolders();
  const sources = useMockSources();

  const sourcesTree = useMemo(() => {
    return buildTree(folders, sources);
  }, [folders, sources]);

  return sourcesTree;
}
