import { Icon, MenuButton } from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";

export default function _MenuButton({ children }: any) {
  return (
    <MenuButton
      m="10px 5px"
      px={4}
      py={2}
      transition="all 0.2s"
      borderRadius="md"
      borderWidth="1px"
      boxShadow="md"
      _hover={{ bg: "primary" }}
      _expanded={{ bg: "primary", opacity: 0.3 }}
    >
      {children} <Icon as={AiOutlineDown} ml="10px" />
    </MenuButton>
  );
}
