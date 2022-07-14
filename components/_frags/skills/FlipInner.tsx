import React from "react";
import { Center, ChakraProps } from "@chakra-ui/react";

interface FlipInnerProps extends ChakraProps {
  children: JSX.Element;
}

export default function FlipInner({ children, ...props }: FlipInnerProps) {
  return (
    <Center
      w={["180px", "220px"]}
      h="150px"
      borderRadius="20"
      shadow="md"
      cursor="pointer"
      fontFamily="Poppins"
      fontWeight={500}
      p={3}
      _groupHover={{ shadow: "lg", transform: "rotateY(-180deg)", opacity: 0 }}
      transition="transform 0.7s, opacity 0.5s"
      fontSize={[16, 18, 20]}
      {...props}
    >
      {children}
    </Center>
  );
}
