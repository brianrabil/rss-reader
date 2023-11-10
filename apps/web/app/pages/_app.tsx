import type { AppProps } from "next/app";
import "@fontsource/roboto";
import React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";

export const muiTheme = (prefersDarkMode: boolean) =>
  createTheme({
    typography: {
      h2: {
        fontFamily: "Playfair Display",
      },
      body1: {
        fontFamily: "Inter",
      },
      body2: {
        fontFamily: "Inter",
      },
      h6: {
        fontFamily: "Inter",
      },
    },
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

function createEmotionCache() {
  return createCache({ key: "css" });
}

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  readonly emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => muiTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
export default MyApp;
