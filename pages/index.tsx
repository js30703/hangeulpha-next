import { Box, Center, layout, VStack, Wrap, WrapItem, Text, Stack, Icon, useColorMode, Button, Heading, Flex, Image, Circle, As } from "@chakra-ui/react";
import Lorem from "components/Lorem";
import type { NextPage } from "next";
import Layout from "components/Layout/DefaultLayout";
import { FiFilePlus } from "react-icons/fi";
import React from "react";
import { RiPaletteLine } from "react-icons/ri";
import { MdOutlineDesignServices, MdOutlineMedicalServices, MdOutlinePsychology } from "react-icons/md";
const w1 = "w2.png";

interface PopUpCardProps {
  icon?: As<any>;
  name?: string;
}

function PopUpCard({ icon = RiPaletteLine, name = "NAME" }: PopUpCardProps) {
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

const Home: NextPage = () => {
  return (
    <Layout title="Hangeulpha">
      <VStack w="100%" minH="100vh" h="100%" overflow="hidden" spacing={0}>
        <Stack direction={["column", "column", "row"]} maxW="1080px">
          <Center p="40px" w={["100%", "100%", "65%"]} borderRadius="200px" flexDirection="column" h="100%" position="relative">
            <Image src="flower1.svg" alt="hi" w={["180px", "200px"]} position="absolute" top="-10px" left="0px" zIndex={0} />
            <Image src="flower2.svg" alt="hi" w={["80px", "90px"]} position="absolute" top="90px" right={["40px", "80px"]} zIndex={1} />
            <Image src={w1} alt="hi" borderRadius="120px" zIndex={0} />
            <Image src="flower.svg" alt="hi" w={["130px", "150px"]} position="absolute" bottom="60px" right="60px" zIndex={1} />
          </Center>
          <Center minW="200px" p="1" w={["100%", "100%", "45%"]} flexDir="column">
            <Heading as="h3" color="primary" my="3">
              BOOST YOUR SKILL
            </Heading>
            <Lorem my="3" px="2" />
            <Button w="75%" leftIcon={<FiFilePlus />} borderRadius="16px" my="4" colorScheme="yellow" variant="outline" color="primary">
              Learn more
            </Button>
          </Center>
        </Stack>
        <Stack direction="column" bgColor="primary" w="100%" spacing={0} m="0px">
          <Box w="100%" maxH="100px" bgColor="plain" zIndex={1}>
            <Center flexDir={["column", "column", "row"]}>
              <PopUpCard icon={RiPaletteLine} name="ART" />
              <PopUpCard icon={MdOutlineDesignServices} name="DESIGN" />
            </Center>
            <Center flexDir={["column", "column", "row"]}>
              <PopUpCard icon={MdOutlineMedicalServices} name="medical" />
              <PopUpCard icon={MdOutlinePsychology} name="Psychology" />
            </Center>
          </Box>
          <Box h={["1500px", "1500px", "700px"]} bgColor="primary" w="100%" />

          <Center py="20px">hi</Center>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default Home;
