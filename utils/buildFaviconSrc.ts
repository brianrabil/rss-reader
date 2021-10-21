import { FaviconProvider } from "./../models";
import { FAVICON_PROVIDERS } from "./../constants";

// TODO: Handle undefined url
export function buildFaviconSrc(url?: string, provider: FaviconProvider = FaviconProvider.Google) {
  const { GOOGLE } = FAVICON_PROVIDERS;
  switch (provider) {
    case FaviconProvider.Google:
    default:
      return GOOGLE + url;
  }
}
