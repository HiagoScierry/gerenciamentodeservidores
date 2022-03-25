import type { NextApiRequest, NextApiResponse } from 'next'
import { runQuery } from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const query = "Select * from CARGO"

    const data = await runQuery(query);

    return res.status(200).json(data)
  }  

  if(req.method === 'POST'){
    const {cargo} = req.body;

    console.log(cargo);
    

    const query = `INSERT INTO CARGO (DESCRICAO) VALUES("${cargo}");`

    const data = await runQuery(query);

    return res.status(200).json(data)
  }

  if(req.method === 'PUT'){
    const {id ,cargo} = req.body;


    const query = `UPDATE CARGO SET DESCRICAO="${cargo}" WHERE IDCARGO=${id};
    `

    const data = await runQuery(query);

    return res.status(200).json(data)
  }

  if(req.method === 'DELETE'){
    const { id } = req.body;

    const query = `DELETE FROM CARGO WHERE IDCARGO = ${id};`

    const data = await runQuery(query);

    return res.status(200).json(data)

  } 

}
