// import { drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDB from "./schema";


import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, sql } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool,schema:{...schemaDB} });



export {db}
