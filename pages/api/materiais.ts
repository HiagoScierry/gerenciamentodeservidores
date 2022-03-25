import type { NextApiRequest, NextApiResponse } from 'next'
import { runQuery } from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const query = "Select * from MATERIAL"

    const data = await runQuery(query);

    return res.status(200).json(data)
  }  
 
  if(req.method === 'POST'){
    const {  
      cargo,
      nome,
      conservado
    } = req.body;


    const query = `INSERT INTO MATERIAL (ESTADOCONSERVADO, NOMEMATERIAL, IDCARGO) 
    VALUES("${conservado}", "${nome}", "${cargo}");
    `

    const data = await runQuery(query);

    return res.status(200).json(data)
  }

  if(req.method === 'PUT'){
    const {
      id ,  
      cargo,
      nome,
      conservado} = req.body;


    const query = `UPDATE MATERIAL SET ESTADOCONSERVADO="${conservado}", NOMEMATERIAL="${nome}", IDCARGO="${cargo}" WHERE IDMATERIAL=${id};`

    const data = await runQuery(query);

    return res.status(200).json(data)
  }

  if(req.method === 'DELETE'){
    const { id } = req.body;

    const query = `DELETE FROM MATERIAL WHERE IDMATERIAL = ${id};`

    const data = await runQuery(query);

    return res.status(200).json(data)

  } 

}
