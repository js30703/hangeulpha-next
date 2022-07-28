import type { NextApiRequest, NextApiResponse } from 'next'
import {auth}from "_firebase/admin"
import { PrismaClient,Verbs } from '@prisma/client'
import prisma from '_prisma'


// _todo = prisma connection management 
const _prisma = process.env.NODE_ENV == 'development'? prisma :  new PrismaClient()

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
    //# todo authenticate
    // if (!req.headers.authorization) { sendResponse(res, 403, {error:'Forbidden'})}
    if (!process.env.allowedHost?.includes(req.headers.host || "")){sendResponse(res, 405, {error:'Forbidden'})}
    if (req.method !== 'GET' ){sendResponse(res, 405, {error:'not allowed'})}
    let { level="1", } = req.query;

    const result = await _prisma.$queryRaw<Verbs[]>`SELECT * FROM "public"."Verbs" where level=${level} ORDER BY random() LIMIT 3;`

    sendResponse(res, 200, {level:level,verbs:result})
  })
}


