import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

const devConfig = process.env.DEV_DB;
const proConfig = process.env.PRODUCT_DB;
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

export default pool;