import logo from "public/hangeulpha.svg";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Box cursor="pointer" w="64px" h="64px" position="relative" top="-8px">
        <Image src={logo} alt="logo" objectFit="contain" />
      </Box>
    </Link>
  );
}
