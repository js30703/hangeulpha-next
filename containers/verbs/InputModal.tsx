import React from "react";
import { conjuFuntion } from "./conju";
import { FaThumbsUp } from "react-icons/fa";
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Icon, Center, chakra } from "@chakra-ui/react";
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
  const is_answer = answer == conjuFuntion(conjuCur, verb.verb, verb.regularType);
  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap isCentered size={["xs", "sm"]}>
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
        <ModalFooter>
          {answer}
          {conjuFuntion(conjuCur, verb.verb, verb.regularType)}
          {answer !== "" && (
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Show Answer
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
