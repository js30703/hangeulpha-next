import { Box, Button, Center, Heading, layout, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Layout from "components/Layout/DefaultLayout";
import type { NextApiRequest, NextApiResponse } from "next";
import { getVerbs } from "_endpoints";
import * as jamo from "jamo";

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse<any>) {
  const _res = await getVerbs();
  return {
    props: { ..._res.data }, // will be passed to the page component as props
  };
}

export default function Index(props: any) {
  const [verbs, setVerbs] = useState({ ...props });

  async function refreshVerbs() {
    const _res = await getVerbs();
    if (_res.status == 200) {
      setVerbs({ ..._res?.data });
    }
  }

  return (
    <Layout title="Conjugations Practice">
      <Center w="100%" minH="calc(100vh - 100px);" overflow="hidden">
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
          <Button rightIcon={<FiRefreshCcw />} onClick={refreshVerbs}>
            Refresh
          </Button>
          {verbs.verbs.map((verb: any) => {
            return (
              <Box key={verb.id}>
                {verb.verb}
                {verb.eng} {jamo.ATT_EOTT(verb.verb, verb.regularType) + "요"}
              </Box>
            );
          })}
        </Center>
      </Center>
    </Layout>
  );
}
