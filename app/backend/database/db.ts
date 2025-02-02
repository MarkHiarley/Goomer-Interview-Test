import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config();
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = parseInt(process.env.DB_PORT || '5432', 10)
const dbDatabase = process.env.DB_DATABASE

const pool = new Pool({
    user: dbUser,
    password: dbPass,
    host: dbHost,
    port: dbPort,
    database: dbDatabase
});
export default pool