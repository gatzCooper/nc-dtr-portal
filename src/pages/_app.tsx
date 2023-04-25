import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const theme = extendTheme({
  components: {},
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
