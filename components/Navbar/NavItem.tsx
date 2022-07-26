import Icon from "@chakra-ui/icon";
import { Box, Center } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactElement } from "react";

export interface NavItem {
  icon?: ReactElement;
  name?: string;
  link: string;
  isFocused?: boolean | undefined;
}

export default function NavItem({ name, icon, link, isFocused }: NavItem) {
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
        flexDirection="column"
      >
        <>
          {name}
          {icon}
          <Box bgColor={isFocused ? "secondary" : "transparent"} h={[0.5, 1, 1.5]} w="80%" mt="3px" borderRadius={40} transition="background 1.5s"></Box>
        </>
      </Center>
    </Link>
  );
}
