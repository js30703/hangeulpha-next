import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button mx="20px" onClick={toggleColorMode} colorScheme="yellow" variant="link" color="primary" fontSize={23}>
      {colorMode === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </Button>
  );
}
