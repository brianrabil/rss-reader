import React from "react";
import { addDecorator } from "@storybook/react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { muiTheme } from "../stylesheet";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

function createEmotionCache() {
	return createCache({ key: "css" });
}

const clientSideEmotionCache = createEmotionCache();

addDecorator((story) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = React.useMemo(() => muiTheme(prefersDarkMode), [
		prefersDarkMode,
	]);
	return (
		<CacheProvider value={clientSideEmotionCache}>
      <CssBaseline />
			<ThemeProvider theme={theme}>{story()}</ThemeProvider>
		</CacheProvider>
	);
});
