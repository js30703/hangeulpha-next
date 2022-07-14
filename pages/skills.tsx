import React, { useState } from "react";
import {
  Box,
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
  Wrap,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "components/Layout/DefaultLayout";
//_todo: get ui from nike page
import FlipCard from "components/_frags/skills/FlipCards";
import {
  SiChakraui,
  SiNextdotjs,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiJquery,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiRedis,
  SiCelery,
  SiNginx,
  SiUbuntu,
  SiAmazonaws,
  SiPython,
} from "react-icons/si";

const frontSkills = [
  {
    name: "Next.js",
    description: "React framework which offers lot of tools ",
    logo: <SiNextdotjs />,
    color: "black",
  },
  {
    name: "Chakra-ui",
    description: "React UI system that allows custom styles",
    logo: <SiChakraui />,
    color: "#32c7b9",
  },
  {
    name: "Redux Toolkit",
    description: "Easy way to manage redux store in react ",
    logo: <SiRedux />,
    color: "#764abc",
  },
  {
    name: "jquery",
    description: "A fast, small, and feature-rich JavaScript library",
    logo: <SiJquery />,
    color: "#1264a5",
  },
  {
    name: "javascript",
    description: "Easy way to manage redux store in react ",
    logo: <SiJavascript />,
    color: "#ebd41c",
  },
  {
    name: "HTML",
    description: "Easy way to manage redux store in react ",
    logo: <SiHtml5 />,
    color: "#e9632a",
  },
  {
    name: "css",
    description: "Easy way to manage redux store in react ",
    logo: <SiCss3 />,
    color: "#2660e4",
  },
];

const backSkills = [
  {
    name: "Django",
    description: "All featured python web framework",
    logo: <SiDjango />,
    color: "#0b4b33",
  },
  {
    name: "PostgreSQL",
    description: "open-source relational database management system",
    logo: <SiPostgresql />,
    color: "#32668e",
  },
  {
    name: "Redis",
    description: "An in-memory key-value database",
    logo: <SiRedis />,
    color: "#dc372e",
  },
  {
    name: "celery",
    description: "An open source asynchronous task queue or job queue",
    logo: <SiCelery />,
    color: "#b6de64",
  },
  {
    name: "Nginx",
    description: "A web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.",
    logo: <SiNginx />,
    color: "#039138",
  },
  {
    name: "Ubuntu",
    description: "Linux OS",
    logo: <SiUbuntu />,
    color: "#e85c25",
  },
  {
    name: "AWS",
    description: "Cloud Computing Infrastructure",
    logo: <SiAmazonaws />,
    color: "#222d3e",
  },
];

export default function Skills({}: NextPage) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const _onOpen = (item: any) => {
    setCurrent({ name: item.name, description: item.description });
    onOpen();
  };
  const _onClose = () => {
    onClose();
    setCurrent({});
  };
  interface Current {
    name?: string;
    description?: string;
  }
  const [current, setCurrent] = useState<Current>({});
  return (
    <Layout title="Skills available">
      <Box w="100%">
        <Heading as="h3" textAlign={"left"} mx="30" my="2">
          Web Front End Skills
        </Heading>
        <Wrap justify={["center", "left"]} my="5" mx={[3, 45]} spacing="8" p="4">
          {frontSkills.map((item, idx) => {
            return <FlipCard key={idx} {...item} onClick={() => _onOpen(item)} isOpen={item.name == current.name} />;
          })}
        </Wrap>
        <Heading as="h3" textAlign={"left"} mx="30" my="2">
          Web Back End Skills
        </Heading>
        <Wrap justify={["center", "left"]} my="5" mx={[3, 45]} spacing="8" p="4">
          {backSkills.map((item, idx) => {
            return <FlipCard key={idx} {...item} onClick={() => _onOpen(item)} isOpen={item.name == current.name} />;
          })}
        </Wrap>
        <Modal isOpen={isOpen} onClose={_onClose} preserveScrollBarGap>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{current?.name?.toLocaleUpperCase()}</ModalHeader>
            <ModalCloseButton _focus={{}} />
            <ModalBody>{current?.description}</ModalBody>
            <ModalFooter>
              <Button variant="ghost" _focus={{}}>
                do some action
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}
