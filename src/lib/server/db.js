import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema.js";
import { config } from "./config.js";

const conn = drizzle(config.DATABASE_URL, { schema, casing: "snake_case" });

export const db = conn;
