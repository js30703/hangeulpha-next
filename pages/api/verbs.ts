import type { NextApiRequest, NextApiResponse } from 'next'
import {dbReadOnly} from '_sqlite3'

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
  return new Promise((resolve) => {
    function sendResponse(res:NextApiResponse<Data>,code:number,json:Data){
      res.status(code).json(json); return resolve(null)
    }
    if (!process.env.allowedHost?.includes(req.headers.host || "")){sendResponse(res, 405, {error:'Forbidden'})}
    if (req.method !== 'GET' ){sendResponse(res, 405, {error:'not allowed'})}
    let { level='1', } = req.query;
    const sql = `select * from verbs where level=${level} order by random() limit 5;`;
    dbReadOnly.all(sql, function(err:any, rows:any[]) {
      if (err) { sendResponse(res, 500, {error:err})}
      sendResponse(res,200,{level:level, verbs:rows})
    })
  })
  
}
