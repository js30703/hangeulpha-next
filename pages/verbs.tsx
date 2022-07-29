import VerbContainer from "components/_containers/verbs/VerbConatiner";
import { Verbs } from "@prisma/client";
import prisma from "_prisma";
import { adminAuthCheck } from "_firebase/admin";

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const idToken = req.cookies?.accessToken;
  const isAuthenticated = await adminAuthCheck(idToken);
  if (isAuthenticated) {
    const result = await prisma.$queryRaw<Verbs[]>`SELECT * FROM "public"."Verbs" where level='1' ORDER BY random() LIMIT 3;`;
    return {
      props: { level: "1", verbs: result }, // will be passed to the page component as props
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
}

export default VerbContainer;
