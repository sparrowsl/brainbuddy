import { defineConfig } from "drizzle-kit";
import { config } from "./src/lib/server/config.js";

/** @type { import("drizzle-kit").Config } */
export default defineConfig({
	schema: "./src/lib/server/schema.js",
	dialect: "sqlite",
	out: "./drizzle",
	casing: "snake_case",
	breakpoints: true,
	strict: true,
	verbose: true,
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
