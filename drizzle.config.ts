import "dotenv/config"; // Ensures .env variables are loaded
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle",         // Directory for generated migrations
  // dialect: "postgresql",    // PostgreSQL dialect
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_XhfrMH04lqLZ@ep-jolly-boat-a1cvjug3-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  },
  verbose: true,
  strict: true,
} satisfies Config;
