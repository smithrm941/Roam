const pg = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/roam'

const db = pg(connectionString)

const create = (email, password) => {
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

const find = (email) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $1
    `,
    [email]).catch(error => error)
}

module.exports =  {create, find}
