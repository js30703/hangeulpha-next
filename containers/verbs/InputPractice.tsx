import { Button, HStack, useDisclosure, Center, IconButton, Flex, Input } from "@chakra-ui/react";
import { Box, ChakraProps } from "@chakra-ui/react";
import { Verbs } from "@prisma/client";
import React, { useState } from "react";

import { BiPlusMedical } from "react-icons/bi";

import { CgArrowsExchangeAltV } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import InputModal from "./InputModal";

interface InputPracticeProps extends ChakraProps {
  conjuCur: number;
  verb: Verbs;
}

export default function InputPractice({ conjuCur, verb, ...props }: InputPracticeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flip, setFlip] = useState(false);
  const [answer, setAnswer] = useState("");
  return (
    <>
      <Center as={HStack} w="100%" {...props} m="10px" p="10px" borderRadius="20px" spacing={3} flexDir={["column-reverse", "row"]}>
        <Center>
          <IconButton
            boxShadow="md"
            mx="5px"
            colorScheme="yellow"
            variant="ghost"
            _hover={{ opacity: 0.9 }}
            aria-label="Search database"
            icon={<BiPlusMedical />}
          />
          <IconButton
            boxShadow="md"
            mx="5px"
            colorScheme="yellow"
            variant="ghost"
            _hover={{ opacity: 0.9 }}
            aria-label="Show Meaning"
            fontSize={30}
            icon={<CgArrowsExchangeAltV />}
            onClick={() => {
              setFlip(!flip);
            }}
          />
        </Center>
        <Flex position="relative">
          <Flex
            w="100%"
            opacity={flip ? 0 : 1}
            transform={flip ? "rotateX(-180deg)" : "rotateX(0deg)"}
            transition="transform 0.7s, opacity 0.7s"
            flexDir={["column", "row"]}
          >
            <Box w={["100%", "100%", "280px"]}>
              <Input
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                size="lg"
                type="text"
                textAlign="center"
                boxShadow="md"
                placeholder={verb.verb.split("0")[0]}
                _placeholder={{ textAlign: "center" }}
              />
            </Box>
            <Button m="10px 5px" boxShadow="md" bgColor="primary" color="white" _hover={{ opacity: 0.9 }} onClick={onOpen}>
              <BsCheckLg />
            </Button>
          </Flex>
          <Flex
            w="100%"
            flexDir={["column", "row"]}
            top="0px"
            left="0px"
            position="absolute"
            opacity={flip ? 1 : 0}
            transform={flip ? "rotateX(0deg)" : "rotateX(-180deg)"}
            zIndex={flip ? 0 : -1}
            transition="transform 0.7s, opacity 0.7s, z-index 0.7s"
          >
            {verb.eng}
            <br />
            {verb.exp}
          </Flex>
        </Flex>
      </Center>
      <InputModal isOpen={isOpen} onClose={onClose} conjuCur={conjuCur} verb={verb} answer={answer} />
    </>
  );
}
