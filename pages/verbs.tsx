import Index from "components/_containers/verbs";
import { Verbs } from "@prisma/client";
import prisma from "_prisma";
import { auth } from "_firebase/admin";

//_todo : permission check.
export default Index;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const idToken = req.cookies?.accessToken;
  idToken &&
    auth.verifyIdToken(idToken).then(async (decodedToken) => {
      //const uid = decodedToken.uid;
      const result = await prisma.$queryRaw<Verbs[]>`SELECT * FROM "public"."Verbs" where level='1' ORDER BY random() LIMIT 3;`;
      return {
        props: { level: "1", verbs: result }, // will be passed to the page component as props
      };
    });
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
}
