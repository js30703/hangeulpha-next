import type { NextApiRequest, NextApiResponse } from 'next'
import {adminAuthCheck, auth}from "_firebaseBack"
import { PrismaClient,Verbs } from '@prisma/client'
import prisma from '_prisma'


type Success = {
  level:string | string[],
  verbs?: any[],
}

type Fail ={
  error:any
}

type Data = Success | Fail

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise(async(resolve) => {
    function sendResponse(res:NextApiResponse<Data>,code:number,json:Data){
      res.status(code).json(json); return resolve(null)
    }

    if (!process.env.allowedHost?.includes(req.headers.host || "")){sendResponse(res, 405, {error:'Forbidden'})}
    if (req.method !== 'GET' ){sendResponse(res, 405, {error:'not allowed'})}
    
    const accessToken = req.headers.authorization?.split('Bearer ')[1]
    if (!accessToken) { sendResponse(res, 403, {error:'Forbidden'})}
    const isAuthenticated = await adminAuthCheck(accessToken)
    if (!isAuthenticated ){ sendResponse(res, 403, {error:'Forbidden'})}

    let { level="1", } = req.query;

    const result = await prisma.$queryRaw<Verbs[]>`SELECT * FROM "public"."Verbs" where level=${level} ORDER BY random() LIMIT 3;`

    sendResponse(res, 200, {level:level,verbs:result})
  })
}


