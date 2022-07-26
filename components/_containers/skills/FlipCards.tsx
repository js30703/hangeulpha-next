import React, { useState } from "react";
import {
  Box,
  WrapItem,
  ChakraProps,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FlipInner from "./FlipInner";

interface FlipCardProps extends ChakraProps {
  name: string;
  description: string;
  logo: JSX.Element;
  color: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export default function FlipCard({ name, description, logo, color, onClick, isOpen = false, ...props }: FlipCardProps) {
  return (
    <WrapItem p="1px" position="relative" role="group" onClick={onClick}>
      <FlipInner opacity={isOpen ? 0 : 1} transform={isOpen ? "rotateY(-180deg)" : "rotateY(0deg)"} w="100%">
        <Box fontSize={80} color={color}>
          {logo}
        </Box>
      </FlipInner>
      <FlipInner
        w="100%"
        position="absolute"
        top="0px"
        left="0px"
        opacity={isOpen ? 1 : 0}
        transform={isOpen ? "rotateY(0deg)" : "rotateY(-180deg)"}
        _groupHover={{ shadow: "lg", transform: "rotateY(0deg)", opacity: 1 }}
      >
        <Box>{name.toLocaleUpperCase()}</Box>
      </FlipInner>
    </WrapItem>
  );
}
