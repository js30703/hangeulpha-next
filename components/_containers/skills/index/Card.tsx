import { Text, Center, ChakraProps, Icon, Circle } from "@chakra-ui/react";
import React from "react";

interface CardProps extends ChakraProps {
  title: string;
  icon: any;
}

export default function Card({ title, icon }: CardProps) {
  return (
    <Center w={["200px", "200px", "230px"]} h="200px" flexDirection="column" p="30px 10px" bgColor="plain" borderRadius="18px" shadow="base" m="20px">
      <Circle size="80px" bg="#ecddcb" color="#6a3fb6">
        <Icon as={icon} fontSize="45px" />
      </Circle>
      <Text fontSize={"30px"} fontFamily="Oswald" color="#6a3fb6" px="10px">
        {title.toLocaleUpperCase()}
      </Text>
    </Center>
  );
}
