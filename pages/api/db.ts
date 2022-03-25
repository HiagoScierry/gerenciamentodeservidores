import knex from 'knex';

const connection = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'Trabalho'
  }
})


const runQuery = async (query: string) => {
  const result = await connection.raw(query);

  return result[0]
}


export { connection, runQuery }