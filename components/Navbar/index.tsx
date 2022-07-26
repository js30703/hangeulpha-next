import {
  Center,
  HStack,
  Spacer,
  Show,
  Hide,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FiAlignJustify } from "react-icons/fi";
import DarkModeToggle from "./DarkmodeToggle";
import Logo from "./Logo";
import Me from "./Me";
import NavItem from "./NavItem";
import { navList } from "./NavList";

interface NavProps {
  urlNow: string;
}

export default function Nav({ urlNow }: NavProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center fontFamily="Poppins" bgColor="plain" fontWeight={[300, 400, 500]} fontSize={[14, 16, 18]} color="primary" px="4" boxShadow="md">
      <HStack w="100%" minH="100px" spacing={2} maxW="1080px">
        <Logo />
        <Spacer />
        <Hide below="sm">
          {navList.map((item, idx) => {
            return <NavItem key={idx} {...item} isFocused={urlNow == item.link} />;
          })}
        </Hide>
        <Show below="sm">
          <Icon as={FiAlignJustify} onClick={onOpen} fontSize={23} />
        </Show>
        <Me />
        <DarkModeToggle />
      </HStack>
      <Show below="sm">
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} preserveScrollBarGap>
          <DrawerOverlay />
          <DrawerContent bgColor="plain" fontFamily="Poppins" color="primary">
            <DrawerHeader borderBottomWidth="1px" boxShadow="md">
              <Logo />
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <VStack py="4" spacing={6}>
                {navList.map((item, idx) => {
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
