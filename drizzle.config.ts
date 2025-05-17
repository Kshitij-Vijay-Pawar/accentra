import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // ✅ Required field
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_XhfrMH04lqLZ@ep-jolly-boat-a1cvjug3-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  },
  verbose: true,
  strict: true,
} satisfies Config;




