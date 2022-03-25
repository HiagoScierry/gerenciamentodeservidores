import type { NextApiRequest, NextApiResponse } from 'next'
import { runQuery } from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const query = `
    Select
      s.IDSERVIDOR ,s.IDENTIFICACAO_SERVIDOR , s.CTPS , p.NOME , 
      c.DESCRICAO as CARGO, c.IDCARGO, p.IDPESSOA
    from
      SERVIDOR s
    inner join PESSOAS p on
      p.IDPESSOA = s.IDSERVIDOR 
    inner join ADMISSAO a on
      a.IDADMISSAO = s.IDSERVIDOR
    INNER JOIN  CARGO c on
      c.IDCARGO = a.IDCARGO;
	`
    const data = await runQuery(query);

    return res.status(200).json(data)
  }  

  if(req.method === 'POST'){
    const {  
      id,
      CTPS,
      cargo,
      servidor
    } = req.body.form;

    const query1 = `INSERT INTO SERVIDOR (IDENTIFICACAO_SERVIDOR, CTPS) VALUES(${servidor}, ${CTPS});
    `
    const data = await runQuery(query1);

    const query2 = `INSERT INTO ADMISSAO (IDADMISSAO ,IDCARGO, DATA_ADMISSAO) 
    VALUES(${data.insertId},${cargo}, ${new Date().toLocaleDateString()});

    `
    const data2 = await runQuery(query2);


    return res.status(200).json(data2)
  }

  if(req.method === 'PUT'){
    const {  
      id,
      CTPS,
      cargo,
      servidor
    } = req.body.form;

    const query1 = `UPDATE SERVIDOR SET IDENTIFICACAO_SERVIDOR=${servidor}, CTPS=${CTPS} WHERE IDSERVIDOR=${id};`
    const data = await runQuery(query1);

    const query2 = `UPDATE ADMISSAO SET IDCARGO=${cargo} WHERE IDADMISSAO=${id};`

    const data2 = await runQuery(query2);

    return res.status(200).json(data2)
  }


  if(req.method === 'DELETE'){
    const { id } = req.body;

    const query = `DELETE FROM SERVIDOR WHERE IDSERVIDOR = ${id};`

    const data = await runQuery(query);

    return res.status(200).json(data)

  } 
 
}
