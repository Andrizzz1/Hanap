import { drizzle } from 'drizzle-orm/node-postgres'; //npm install drizzle-orm pg
import { Pool } from 'pg'; //npm install --save-dev @types/pg


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// This exports the 'db' variable that auth.ts is looking for
export const db = drizzle(pool);
