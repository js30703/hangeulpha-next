import { Box, ChakraProps } from "@chakra-ui/react";
import { LoremIpsum } from "lorem-ipsum";
import React from "react";
import dynamic from "next/dynamic";

interface LoremProps extends ChakraProps {
  count?: number;
  type?: "W" | "S" | "P";
}

function Lorem({ count = 1, type = "P", ...props }: LoremProps) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  function controlLorem(type: string, count: number) {
    switch (type) {
      case "W":
        return lorem.generateWords(count);
      case "S":
        return lorem.generateSentences(count);
      case "P":
        return lorem.generateParagraphs(count);
    }
  }
  return <Box {...props}>{controlLorem(type, count)}</Box>;
}

export default dynamic(() => Promise.resolve(Lorem), {
  ssr: false,
});
