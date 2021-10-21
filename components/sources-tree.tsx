import React, { useEffect, useState, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Folder } from "../models/folder";
import { Source } from "../models/source";
import { useFavicon } from "../hooks";

export interface SourcesTreeProps {
  sources?: Folder[];
}

export default function SourcesTree({ sources }: SourcesTreeProps) {
  const { getFavicon } = useFavicon();

  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const folderStyles = useRef({
    paddingLeft: "0px",
    paddingRight: "0px",
  });

  const sourceStyles = useRef({
    paddingLeft: "0px",
    paddingRight: "0px",
  });

  const handleToggle = (event: any, nodeIds: any) => setExpanded(nodeIds);
  const handleSelect = (event: any, nodeIds: any) => setSelected(nodeIds);

  useEffect(() => {
    if (sources) {
      const indices = sources.map(
        (source: any, index: number) => index + 1 + ""
      );
      setExpanded(indices);
    }
  }, [sources]);

  return (
    <TreeView
      aria-label="file system navigator"
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {(sources || []).map((folder: Folder) => (
        <TreeItem
          key={folder.id}
          nodeId={folder.id}
          label={folder.name}
          sx={folderStyles.current}
        >
          {(folder.sources || []).map((source: Source) => (
            <TreeItem
              key={source.id}
              icon={
                <img 
                  src={getFavicon(source?.url)}
                  style={{
                    maxHeight: 12,
                    maxWidth: 15,
                  }}
                />
              }
              nodeId={source.id}
              label={source.name}
              sx={sourceStyles.current}
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
}
