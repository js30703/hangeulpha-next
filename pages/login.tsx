import { Box, Button, Center, Heading, layout, Stack } from "@chakra-ui/react";
import { extractTokenFormFirebaseUser, google_login } from "_firebaseFront";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import type { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import Layout from "components/Layout/DefaultLayout";
import Router from "next/router";
import { saveToken } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  async function _login() {
    const user = await google_login();
    if (user?.accessToken) {
      dispatch(saveToken(extractTokenFormFirebaseUser(user)));
      Router.push("/");
    }
  }
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
          <Button w="200px" colorScheme="red" my="20px" leftIcon={<BsGoogle />} onClick={_login}>
            GOOGLE
          </Button>
        </Center>
      </Center>
    </Layout>
  );
}
