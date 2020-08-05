import knex from 'knex'
import path from 'path'

const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') 
  },
})

export default db;