import { defineConfig } from "drizzle-kit";

import { config } from "./src/lib/server/config.js";

/** @type { import("drizzle-kit").Config } */
export default defineConfig({
	schema: "./src/lib/server/schema.js",
	dialect: "sqlite",
	breakpoints: true,
	strict: true,
	out: "./drizzle",
	verbose: true,
	casing: "snake_case",
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
