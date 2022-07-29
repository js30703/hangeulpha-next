import { Box, Center, ChakraProvider, ColorModeScript, Spinner } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "styles/theme";
import { store } from "store";
import { Provider } from "react-redux";
import AuthInitLoader from "components/AuthInitLoader";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthInitLoader />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
