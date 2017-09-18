const pg = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432'

const db = pg(connectionString)

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO users
    VALUES($1::text $2::text)
  `, [email, password])
}

module.exports = {

}
