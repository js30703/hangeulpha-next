import React from "react";
import { Box, Center, Heading, layout, Wrap, WrapItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "components/Layout/DefaultLayout";
//todo_: get ui from nike page

export default function portfolios({}: NextPage) {
  const portfolios = [{}];
  function _WrapItem() {
    return (
      <WrapItem>
        <Center w="180px" h="80px" bg="red.200">
          Box 1
        </Center>
      </WrapItem>
    );
  }

  return (
    <Layout title="Projects I did">
      <div>
        <Box>
          <Heading as="h3" textAlign={"left"} mx="30" my="2">
            Portfolios
          </Heading>
          EMPTY
        </Box>
      </div>
    </Layout>
  );
}
