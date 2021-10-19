import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "@fontsource/roboto";
import React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import type {} from "@mui/lab/themeAugmentation";
import Layout from "./../components/layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "./../graphql";

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
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
export default MyApp;
