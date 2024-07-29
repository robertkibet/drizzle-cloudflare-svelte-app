import {defineConfig} from "drizzle-kit";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
/**
 * Tutorials
 * https://www.youtube.com/watch?v=dHTGEQnogPw&ab_channel=WebDevCody
 * https://sat0shi.dev/posts/drizzle-migration/
 * https://sat0shi.dev/posts/drizzle-intro/
 */
export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    accountId: process.env.DB_ACCOUNT_ID!,
    databaseId: process.env.DB_DATABASE_ID!,
    token: process.env.DB_TOKEN!,
  },
  verbose: true,
  strict: true,
});
