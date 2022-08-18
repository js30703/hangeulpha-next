import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    return res.status(200).json({name:"JonDo",method:req.method})
  }


const middle = async (handler:any) =>  {
    return (req: NextApiRequest, res: NextApiResponse,) =>{
            console.log('HIOHIH')
            return res.status(200)
    }
    
}

export default handler