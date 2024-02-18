import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

/*
const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
};*/

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const proConfig = process.env.DATABASEURL;
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

export default pool;