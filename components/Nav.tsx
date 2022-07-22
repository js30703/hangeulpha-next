import {
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Show,
  Hide,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Spinner,
  useColorMode,
  Button,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiAlignJustify } from "react-icons/fi";
import { Dispatch } from "react";
import Image from "next/image";
import logo from "public/hangeulpha.svg";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import type { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";

function Logo() {
  return (
    <Link href="/">
      <Box cursor="pointer" _focus={{}} w="64px" h="64px" position="relative" top="-8px">
        <Image src={logo} alt="logo" objectFit="contain" />
      </Box>
    </Link>
  );
}

export interface NavItem {
  name: string;
  link: string;
  isFocused?: boolean;
}

function NavItem({ name, link, isFocused }: NavItem) {
  return (
    <Link href={link}>
      <Center
        m="0px"
        w="80px"
        p="1"
        cursor={"pointer"}
        color={isFocused ? "primary" : "primary"}
        fontSize={[12, 14, 16]}
        transition="background 0.5s"
        _focus={{}}
        flexDirection="column"
      >
        {name}
        <Box bgColor={isFocused ? "secondary" : "transparent"} h={[0.5, 1, 1.5]} w="80%" mt="3px" borderRadius={40} transition="background 0.5s"></Box>
      </Center>
    </Link>
  );
}

function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button mx="20px" onClick={toggleColorMode} colorScheme="yellow" variant="outline" color="primary">
      {colorMode === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </Button>
  );
}

interface NavProps {
  loading: boolean;
  setLoading: Dispatch<boolean>;
}

export default function Nav({ loading, setLoading }: NavProps) {
  const nav_items = [
    {
      name: "Skills",
      link: "/skills",
    },
    {
      name: "Portfolios",
      link: "/portfolios",
    },
    Login(),
  ];
  function Login() {
    function isEmpty(obj: object) {
      return Object.keys(obj).length === 0;
    }
    const auth = useSelector((state: RootState) => state.auth);
    if (!isEmpty(auth)) {
      return {
        name: "Logout",
        link: "/logout",
      };
    }
    return {
      name: "Login",
      link: "/login",
    };
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [urlNow, setUrlNow] = useState("/");

  // 로딩 완료의 시점을 url 이 바뀌었을때로 잡음
  useEffect(() => {
    const handleStart = (url: string) => {
      setUrlNow(url);
      url !== router.pathname && setLoading(true);
    };
    const handleComplete = (url: string) => {
      url === router.pathname && setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    setUrlNow(router.pathname);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <Center fontFamily="Poppins" bgColor="plain" fontWeight={[300, 400, 500]} fontSize={[14, 16, 18]} color="primary" px="4" boxShadow="md">
      <HStack w="100%" minH="100px" spacing={2} maxW="1080px">
        <Logo />
        <Spacer />
        <Hide below="sm">
          {nav_items.map((item, idx) => {
            return <NavItem key={idx} {...item} isFocused={urlNow == item.link} />;
          })}
        </Hide>
        <Show below="sm">
          <Icon as={FiAlignJustify} onClick={onOpen} fontSize={25} />
        </Show>
        {DarkModeToggle()}
      </HStack>
      <Show below="sm">
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} preserveScrollBarGap>
          <DrawerOverlay />
          <DrawerContent bgColor="plain" fontFamily="Poppins" color="primary">
            <DrawerHeader borderBottomWidth="1px" boxShadow="md">
              <Logo />
              <DrawerCloseButton _focus={{}} />
            </DrawerHeader>
            <DrawerBody>
              <VStack py="4" spacing={6}>
                {nav_items.map((item, idx) => {
                  return <NavItem key={idx} {...item} isFocused={urlNow == item.link} />;
                })}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </Center>
  );
}
