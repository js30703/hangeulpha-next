import { Box, Center, Heading, Circle, As, Icon } from "@chakra-ui/react";
import React from "react";
import { RiPaletteLine } from "react-icons/ri";
import Lorem from "components/Lorem";

interface PopUpCardProps {
  icon?: As<any>;
  name?: string;
}

export default function PopUpCard({ icon = RiPaletteLine, name = "NAME" }: PopUpCardProps) {
  return (
    <Box m="20px">
      <Center
        flexDir="column"
        w="320px"
        h="350px"
        bgColor="plain"
        borderRadius="20px"
        shadow="md"
        transition="0.3s"
        position="relative"
        top="20px"
        _hover={{ shadow: "lg", top: "0px" }}
      >
        <Circle size="80px" bg="primary">
          <Icon as={icon} fontSize="36px" />
        </Circle>
        <Heading as="h4" my="20px" fontSize="30px">
          {name.toLocaleUpperCase()}
        </Heading>
        <Lorem type="S" my="3" px="2" textAlign="center" />
      </Center>
    </Box>
  );
}
