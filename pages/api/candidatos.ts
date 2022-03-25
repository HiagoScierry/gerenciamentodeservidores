import type { NextApiRequest, NextApiResponse } from 'next'
import { IPessoa } from '../candidatos/Candidatos';
import { runQuery } from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const query = `
    SELECT
    c.IDCANDIDATO ,
    p.NOME ,
    p.IDADE ,
    p.CPF ,
    p.SEXO ,
    c.ESCOLARIDADE ,
    c.SITUACAOMILITAR ,
    c.COMPETENCIAS,
    e.*
  from
    CANDIDATO c
  inner join PESSOAS p on
    p.IDPESSOA = c.IDCANDIDATO
  INNER JOIN ENDERECO e ON
    e.IDENDERECO = p.IDENDERECO`;

    const data = await runQuery(query);

    return res.status(200).json(data)
  }  

  if(req.method === 'POST'){
    const form: IPessoa = req.body.form;

    const { 
      nome,
      idade,
      cpf,
      rg,
      escolaridade,
      competencia,
      situacao,
      logradouro,
      complemento,
      bairro,
      numero,
      sexo
    } = form;

    const enderecoQuery = `INSERT INTO ENDERECO (LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO) 
    VALUES("${logradouro}", ${numero}, "${complemento}", "${bairro}");
    `
    const endereco = await runQuery(enderecoQuery);

    const pessoaQuery = `
    INSERT INTO PESSOAS (NOME, IDADE, CPF, RG, SEXO, IDENDERECO) 
    VALUES('${nome}', ${idade}, '${cpf}', '${rg}', '${sexo}', ${endereco.insertId});
    `
    const pessoa = await runQuery(pessoaQuery);

    const candidatoQuery = `
    INSERT INTO CANDIDATO (ESCOLARIDADE, COMPETENCIAS, SITUACAOMILITAR, IDPESSOA) 
    VALUES("${escolaridade}", "${competencia}", "${situacao}", ${pessoa.insertId});
    `

    const data = await runQuery(candidatoQuery);

    return res.status(200).json(data)
  }

  if(req.method === 'PUT'){
    const form: IPessoa = req.body.form;

    const { 
      id,
      idendereco,
      nome,
      idade,
      cpf,
      rg,
      escolaridade,
      competencia,
      situacao,
      logradouro,
      complemento,
      bairro,
      numero,
      sexo
    } = form;

    const enderecoQuery = `
    UPDATE ENDERECO SET 
    LOGRADOURO="${logradouro}", 
    NUMERO=${numero}, 
    COMPLEMENTO="${complemento}", 
    BAIRRO="${bairro}" WHERE IDENDERECO=${idendereco};
`
    await runQuery(enderecoQuery);

    const pessoaQuery = `
    UPDATE PESSOAS SET NOME='${nome}', IDADE=${idade}, CPF='${cpf}', RG='${rg}', SEXO='${sexo}' WHERE IDPESSOA=${id};
`
    const pessoa = await runQuery(pessoaQuery);

    const candidatoQuery = `
    UPDATE CANDIDATO SET ESCOLARIDADE="${escolaridade}", 
    COMPETENCIAS="${competencia}", 
    SITUACAOMILITAR='${situacao}' WHERE IDCANDIDATO=${id};

    `
    const data = await runQuery(candidatoQuery);

    return res.status(200).json(data)
  }

  if(req.method === 'DELETE'){
    const { id } = req.body;

    const query = `DELETE FROM CARGO WHERE IDCARGO = ${id};`

    const data = await runQuery(query);

    return res.status(200).json(data)

  } 
}
