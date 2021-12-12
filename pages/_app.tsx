import "../styles/globals.scss";
import "@fontsource/roboto";
import type {} from "@mui/lab/themeAugmentation";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import React from "react";
import { client } from "./../graphql";
import createCache from "@emotion/cache";
import { store } from "./../store";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(() => muiTheme(prefersDarkMode), [
    prefersDarkMode,
  ]);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </ApolloProvider>
  );
}
export default MyApp;
