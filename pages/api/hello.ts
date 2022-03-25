// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from './db'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const query = await connection.raw("select * from breed")
  
  //@ts-ignore
  console.log(query[0].map(index => index.name));
  

  res.status(200).json(query[0])
}
