import React, { useState } from "react";
import { conjuFuntion } from "./conju";
import { FaThumbsUp } from "react-icons/fa";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  Center,
  chakra,
  Box,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Verbs } from "@prisma/client";
import { motion, isValidMotionProp } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop: any) => isValidMotionProp(prop) || prop === "children",
});

interface InputModalProps {
  conjuCur: number;
  isOpen: boolean;
  answer: string;
  onClose: any;
  verb: Verbs;
}

export default function InputModal({ conjuCur, verb, isOpen, onClose, answer }: InputModalProps) {
  const AnswerCalculated = conjuFuntion(conjuCur, verb.verb, verb.regularType).split("");
  const is_answer = answer == conjuFuntion(conjuCur, verb.verb, verb.regularType);
  const AnswerUser = answer.split("");
  const [ShowAnswer, setShowAnswer] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowAnswer(false);
        onClose();
      }}
      preserveScrollBarGap
      isCentered
      size={["xs", "sm"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Check Answer</ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody as={Center} w="100%" p="20px 10px">
          {answer == "" ? (
            <Text textAlign="center" fontSize={30}>
              Please <br />
              Type your answer
              <br />
              🙇🏻‍♀️ 🙇🏻‍♀️ 🙇🏻‍♀️
            </Text>
          ) : (
            <ChakraBox
              animate={{
                scale: [1, 2, 1.5],
                rotate: [-270, -180, 0],
              }}
              // @ts-ignore no problem in operation, although type error appears.
              transition={{
                duration: 0.3,
                ease: "linear",
                repeat: false,
              }}
              padding="2"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={is_answer ? FaThumbsUp : AiOutlineClose} color={is_answer ? "primary" : "red"} fontSize={50} />
            </ChakraBox>
          )}
        </ModalBody>
        {answer !== "" && (
          <ModalFooter h="100px" w="100%">
            <Flex flexDir="column" w="60%" display={ShowAnswer ? "flex" : "none"} fontSize={25}>
              <Text>💁🏻‍♀️ {AnswerCalculated}</Text>
              <Text>
                👩‍🎓{" "}
                {AnswerUser.map((_char, idx) => {
                  return (
                    <Text display="inline" key={`ANS-${idx}`} color={AnswerCalculated[idx] === _char ? "black" : "red"}>
                      {_char}
                    </Text>
                  );
                })}
              </Text>
            </Flex>

            <Button
              colorScheme="blue"
              px="20px"
              ml="auto"
              onClick={() => {
                setShowAnswer(!ShowAnswer);
              }}
            >
              Answer
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
