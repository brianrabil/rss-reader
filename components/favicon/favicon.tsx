import { useMemo } from "react";
import { useFavicon } from "@/hooks";
import { Source } from "@/models";

const DEFAULT_SIZE = 15;

export interface FaviconProps {
  source?: Source;
  size?: number;
}

export default function Favicon({ source, size = DEFAULT_SIZE }: FaviconProps) {
  const { favicon } = useFavicon(source?.url);

  const faviconStyles = useMemo(
    () => ({
      maxHeight: size,
      maxWidth: size,
    }),
    [source, size]
  );

  return <img src={favicon} style={faviconStyles} />;
}
