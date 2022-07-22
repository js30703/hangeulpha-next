
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '_firebase/admin'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resDb = await db.collection('TEST').doc('test1').set({
    name:'no name'
  })
  res.status(200).json({name:'hi'})
}
