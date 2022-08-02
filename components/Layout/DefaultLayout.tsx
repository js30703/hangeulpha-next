import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar";
import Head from "next/head";
import usePageLoading from "./usePageLoading";

interface LayoutProps {
  title?: string;
  children: JSX.Element;
}

export default function Layout({ children, title }: LayoutProps) {
  const { loading, urlNow } = usePageLoading();
  return (
    <Box w="100%" bgColor="plain" m="0px" pb="10px" minH="100vh" overflow="auto" h="100%">
      <Nav urlNow={urlNow} />
      {loading && (
        <Center w="100%" pt="300px">
          <Spinner color="primary" size="xl" thickness="10px" speed="0.65s" emptyColor="secondary" />
        </Center>
      )}
      {!loading && <Box>{children}</Box>}
    </Box>
  );
}
