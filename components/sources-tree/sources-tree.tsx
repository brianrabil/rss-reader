import { Folder, Source } from "@/models";
import { Favicon } from "@/components";
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import React, { useEffect, useState, useRef } from "react";
import { TreeItem, TreeView } from "@mui/lab";

export interface SourcesTreeProps {
  sources?: Folder[];
}

export default function SourcesTree({ sources }: SourcesTreeProps) {

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

  const handleSelect = (event: any, nodeIds: any) => setSelected(nodeIds);
  const handleToggle = (event: any, nodeIds: any) => setExpanded(nodeIds);

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
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeSelect={handleSelect}
      onNodeToggle={handleToggle}
      selected={selected}
      sx={{
        height: "100%",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {(sources || []).map((folder: Folder) => (
        <TreeItem
          key={folder.id}
          label={folder.name}
          nodeId={folder.id}
          sx={folderStyles.current}
        >
          {(folder.sources || []).map((source: Source) => (
            <TreeItem
              key={source.id}
              icon={<Favicon source={source} />}
              label={source.name}
              nodeId={source.id}
              sx={sourceStyles.current}
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
}
