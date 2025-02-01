import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_DATABASE || "sistema_restaurantes"
});
export default pool