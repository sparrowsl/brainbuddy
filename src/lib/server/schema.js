import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const roomsTable = sqliteTable("rooms", {
	id: text("id").primaryKey().notNull().unique(),
	name: text("name").notNull(),
	description: text("description"),
	created: text("created").default(sql`CURRENT_TIMESTAMP`),
	updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
	// participants:text("participants")
	// host: text("host").notNull(),
	// topic:text("topic").notNull(),
});
