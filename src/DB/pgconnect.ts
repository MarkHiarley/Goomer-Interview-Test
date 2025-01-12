import {Pool} from 'pg'

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "sistema_restaurantes"
})

export default pool