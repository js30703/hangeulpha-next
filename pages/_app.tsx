import { Box, Center, ChakraProvider, ColorModeScript, Spinner } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "styles/theme";
import { store } from "store";
import { Provider } from "react-redux";
import { ThemeProvider, useColorMode, useTheme } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
