import { drizzle } from "drizzle-orm/better-sqlite3";

import { config } from "./config.js";
import * as schema from "./schema.js";

const conn = drizzle(config.DATABASE_URL, { schema, casing: "snake_case" });

export const db = conn;
