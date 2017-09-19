const pg = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/roam'

const db = pg(connectionString)

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
        *
  `, [
    email,
    password
  ]).catch(error => error)
}

module.exports =  createUser
