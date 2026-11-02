import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { Pool } from "pg";
//npx auth@latest migrate --config ./lib/auth/auth.ts this creates the table for pgAdmin
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      fname: {
        type: "string",
        required: true,
      },
      lname: {
        type: "string",
        required: true,
      },
    },
  },
});

export async function getSession(){
  const result = await auth.api.getSession({
    headers:await headers()
  })

  return result;
}