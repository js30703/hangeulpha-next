import { Box, Button, Center, Heading, layout, Stack } from "@chakra-ui/react";
import { google_login } from "_firebaseInit";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import Layout from "components/Layout/DefaultLayout";

export default function Login() {
  return (
    <Layout title="Login">
      <Center w="100%" minH="calc(100vh - 100px);" bgGradient="linear(to-t, primary, plain)" overflow="hidden">
        <Center
          w="350px"
          bgColor="plain"
          borderRadius="20px"
          h="300px"
          flexDir="column"
          m="auto"
          justifyContent="flex-start"
          py="20px"
          shadow="lg"
          position="relative"
          top="-80px"
        >
          <Heading my="20px"> LOGIN WITH</Heading>
          <Button w="200px" colorScheme="red" my="20px" leftIcon={<BsGoogle />} onClick={google_login}>
            GOOGLE
          </Button>
        </Center>
      </Center>
    </Layout>
  );
}
