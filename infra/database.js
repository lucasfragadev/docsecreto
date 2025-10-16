import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

function getVSSLValues() {
  if (process.env.POSTGRES_CA) {
    return { ca: process.env.POSTGRES_CA };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: getVSSLValues(),
});

async function query(queryObject, params) {
  try {
    const result = await pool.query(queryObject, params);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default { query };
export { pool };
