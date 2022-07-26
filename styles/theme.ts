import { extendTheme } from "@chakra-ui/react";
// E9D5CA
export const theme =  extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        _focus:{boxShadow:'xs',},
      },
    },
  },
  
  initialColorMode: 'light',
  useSystemColorMode: false,
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      primary: {
        default: "#f3af31",
        _dark: "#f3af31",
      },
      secondary: {
        default: "#0093AB",
        _dark: "#00AFC1",
      },
      plain: {
        default: "#EEEEEE",
        _dark: "#202024",
      },
    },
  },
});
