import { useMemo } from "react";
import { buildFaviconSrc } from "./../utils";
import { FaviconProvider } from './../models';

export function useFavicon(
  url?: string,
  provider?: FaviconProvider
) {
  const favicon = useMemo(() => buildFaviconSrc(url, provider), [
    url,
    provider,
  ]);

  function getFavicon(targetUrl?: string, provider?: FaviconProvider) {
    return buildFaviconSrc(targetUrl, provider);
  }

  return {
    favicon,
    getFavicon
  };
}
