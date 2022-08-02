import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import HomeContainer from "containers/home/HomeContainer";
const w1 = "w2.png";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Hangeulpha</title>
        <meta name="description" content="Learn Korean" />
      </Head>
      <HomeContainer />
    </Box>
  );
};

export default Home;
