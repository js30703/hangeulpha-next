import Index from "components/_containers/verbs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getVerbs } from "_endpoints";

export default Index;

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse<any>) {
  const _res = await getVerbs();
  return {
    props: { ..._res.data }, // will be passed to the page component as props
  };
}
