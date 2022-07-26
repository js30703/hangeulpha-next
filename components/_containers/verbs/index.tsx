import { Menu, MenuList, MenuItem, Spacer, Flex, Box, Button, Center, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Layout from "components/Layout/DefaultLayout";
import InputPractice from "./InputPractice";
import { getVerbs } from "_endpoints";
import { conjuDisplay } from "./conju";
import _MenuButton from "./MenuButton";
import { Verbs } from "@prisma/client";
import { conjuFuntion } from "./conju";
export default function Index(props: any) {
  const [level, setLevel] = useState(1);
  const [conjuCur, setConjuCur] = useState(0);
  const [verbs, setVerbs] = useState({ ...props });

  async function refreshVerbs() {
    const _res = await getVerbs(level);
    if (_res.status == 200) {
      setVerbs({ ..._res?.data });
    }
  }

  return (
    <Layout title="Conjugations Practice">
      <Center w="100%" minH="calc(100vh - 100px);" overflow="hidden" h="100%">
        <Center
          w={["350px", "450px", "580px"]}
          bgColor="plain"
          borderRadius="20px"
          flexDir="column"
          justifyContent="flex-start"
          p="40px 30px"
          shadow="lg"
          m="20px 10px 100px"
        >
          <Heading w="100%" p="5px 35px">
            Conjugations Practice
          </Heading>
          <Flex w="100%" fontSize={17} fontFamily="Poppins" p="30px 20px" flexDir={["column-reverse", "column-reverse", "row"]}>
            <Button rightIcon={<FiRefreshCcw />} onClick={refreshVerbs} m="10px 5px" bgColor="secondary" color="white" _hover={{ opacity: 0.9 }}>
              Refresh
            </Button>
            <Spacer />
            <Menu>
              <_MenuButton>Level {level}</_MenuButton>
              <MenuList>
                <MenuItem onClick={() => setLevel(1)}>Level 1</MenuItem>
                <MenuItem onClick={() => setLevel(2)}>Level 2</MenuItem>
                <MenuItem onClick={() => setLevel(3)}>Level 3</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <_MenuButton>{conjuDisplay(conjuCur)}</_MenuButton>
              <MenuList>
                {[0, 1, 2, 3, 4, 5, 6].map((i, idx) => {
                  return (
                    <MenuItem key={i} onClick={() => setConjuCur(i)}>
                      {conjuDisplay(i)}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>
          {verbs.verbs.map((verb: Verbs) => {
            // return (
            //   <Box key={verb.id} fontSize={50}>
            //     {verb.verb} ➡️{conjuFuntion(conjuCur, verb.verb, verb.regularType)}
            //   </Box>
            // );
            return <InputPractice key={verb.verb} conjuCur={conjuCur} verb={verb} />;
          })}
        </Center>
      </Center>
    </Layout>
  );
}
