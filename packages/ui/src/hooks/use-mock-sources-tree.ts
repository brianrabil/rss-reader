import { useMemo } from "react";
import type { Folder, Source } from "../models";
import { useMockFolders } from "./use-mock-folders";
import { useMockSources } from "./use-mock-sources";

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

export function useMockSourcesTree(): Folder[] {
  const folders = useMockFolders();
  const sources = useMockSources();

  const sourcesTree = useMemo(() => {
    return buildTree(folders, sources);
  }, [folders, sources]);

  return sourcesTree;
}
